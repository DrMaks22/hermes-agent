from types import SimpleNamespace

from agent.i18n import pluralize, t
from hermes_cli.commands import gateway_help_lines
from hermes_cli.banner import build_welcome_banner
from hermes_cli.config import config_command
from hermes_cli.status import show_status
from hermes_cli.vercel_auth import describe_vercel_auth


def test_translation_catalog_uses_russian(monkeypatch):
    monkeypatch.setenv("HERMES_LANGUAGE", "ru")

    assert t("commands.help.title", default="Available Commands") == "Доступные команды"
    assert t("commands.help.skills_title", default="Skill Commands") == "Команды навыков"
    assert t("cli.fresh_start", default="Fresh start!") == "Новый сеанс! Экран очищен, беседа сброшена."


def test_pluralize_prefers_russian_forms():
    assert pluralize(1, "инструмент", "инструмента", "инструментов", language="ru") == "инструмент"
    assert pluralize(2, "инструмент", "инструмента", "инструментов", language="ru") == "инструмента"
    assert pluralize(5, "инструмент", "инструмента", "инструментов", language="ru") == "инструментов"
    assert pluralize(21, "инструмент", "инструмента", "инструментов", language="ru") == "инструмент"


def test_gateway_help_lines_are_localized(monkeypatch):
    monkeypatch.setenv("HERMES_LANGUAGE", "ru")

    lines = gateway_help_lines()

    assert any("Показать доступные команды" in line for line in lines)
    assert any("/help" in line and "Показать доступные команды" in line for line in lines)
    assert any("библиотеки навыков" in line for line in lines)
    assert any("альтернативные имена" in line for line in lines)


def test_show_status_uses_russian_locale(monkeypatch, capsys, tmp_path):
    from hermes_cli import status as status_mod
    import hermes_cli.auth as auth_mod
    import hermes_cli.gateway as gateway_mod

    monkeypatch.setenv("HERMES_LANGUAGE", "ru")
    monkeypatch.setattr(status_mod, "get_env_path", lambda: tmp_path / ".env", raising=False)
    monkeypatch.setattr(status_mod, "get_hermes_home", lambda: tmp_path, raising=False)
    monkeypatch.setattr(status_mod, "load_config", lambda: {"model": "gpt-5.4", "terminal": {"backend": "local"}}, raising=False)
    monkeypatch.setattr(status_mod, "resolve_requested_provider", lambda requested=None: "openai-codex", raising=False)
    monkeypatch.setattr(status_mod, "resolve_provider", lambda requested=None, **kwargs: "openai-codex", raising=False)
    monkeypatch.setattr(status_mod, "provider_label", lambda provider: "OpenAI Codex", raising=False)
    monkeypatch.setattr(auth_mod, "get_nous_auth_status", lambda: {}, raising=False)
    monkeypatch.setattr(auth_mod, "get_codex_auth_status", lambda: {}, raising=False)
    monkeypatch.setattr(auth_mod, "get_qwen_auth_status", lambda: {}, raising=False)
    monkeypatch.setattr(auth_mod, "get_minimax_oauth_auth_status", lambda: {}, raising=False)
    monkeypatch.setattr(gateway_mod, "find_gateway_pids", lambda exclude_pids=None: [], raising=False)

    show_status(SimpleNamespace(all=False, deep=False))

    output = capsys.readouterr().out
    assert "Статус Hermes Agent" in output
    assert "Провайдеры API-ключей" in output
    assert "Платформы обмена сообщениями" in output


def test_vercel_auth_is_localized(monkeypatch):
    monkeypatch.setenv("HERMES_LANGUAGE", "ru")
    monkeypatch.setenv("VERCEL_OIDC_TOKEN", "oidc-token")

    auth_status = describe_vercel_auth()

    assert "OIDC-token" in auth_status.label
    assert any("режим: OIDC" in line for line in auth_status.detail_lines)


def test_welcome_banner_uses_russian_locale(monkeypatch):
    import model_tools
    import tools.mcp_tool
    from rich.console import Console
    from unittest.mock import patch

    monkeypatch.setenv("HERMES_LANGUAGE", "ru")

    with (
        patch.object(model_tools, "check_tool_availability", return_value=(["web"], [])),
        patch.object(tools.mcp_tool, "get_mcp_status", return_value=[]),
        patch("hermes_cli.banner.get_available_skills", return_value={}),
        patch("hermes_cli.banner.get_update_result", return_value=None),
    ):
        console = Console(record=True, force_terminal=False, color_system=None, width=160)
        build_welcome_banner(
            console=console,
            model="anthropic/test-model",
            cwd="/tmp/project",
            tools=[{"function": {"name": "web_search"}}],
            get_toolset_for_tool=lambda name: "web" if name == "web_search" else None,
        )

    output = console.export_text()
    assert "Доступные инструменты" in output
    assert "Доступные навыки" in output
    assert "Навыки не установлены." in output
    assert "/help — список команд" in output


def test_config_check_is_localized(monkeypatch, capsys):
    from hermes_cli import config as config_mod

    monkeypatch.setenv("HERMES_LANGUAGE", "ru")
    monkeypatch.setattr(config_mod, "REQUIRED_ENV_VARS", [], raising=False)
    monkeypatch.setattr(config_mod, "OPTIONAL_ENV_VARS", {}, raising=False)
    monkeypatch.setattr(config_mod, "get_missing_config_fields", lambda: [{"key": "foo"}], raising=False)
    monkeypatch.setattr(config_mod, "check_config_version", lambda: (1, 2), raising=False)

    config_command(SimpleNamespace(config_command="check"))

    output = capsys.readouterr().out
    assert "Статус конфигурации" in output
    assert "Версия конфигурации:" in output
    assert "Обязательные:" in output
    assert "Необязательные:" in output
    assert "Доступно новых параметров конфигурации" in output
    assert "Запустите 'hermes config migrate', чтобы добавить их" in output


def test_show_config_is_localized(monkeypatch, capsys, tmp_path):
    from hermes_cli.config import show_config

    monkeypatch.setenv("HERMES_LANGUAGE", "ru")
    monkeypatch.setenv("HERMES_HOME", str(tmp_path))

    show_config()

    output = capsys.readouterr().out
    assert "Конфигурация Hermes Agent" in output
    assert "Пути" in output
    assert "API-ключи" in output
    assert "Редактировать файл конфигурации" in output
    assert "Запустить мастер настройки" in output


def test_main_help_exposes_localized_config_and_status_entries(monkeypatch, capsys):
    import sys
    from hermes_cli import main as main_mod
    import pytest

    monkeypatch.setenv("HERMES_LANGUAGE", "ru")
    monkeypatch.setattr(sys, "argv", ["hermes", "--help"])

    with pytest.raises(SystemExit) as exc:
        main_mod.main()

    assert exc.value.code == 0
    output = capsys.readouterr().out
    assert "Просмотр и редактирование конфигурации" in output
    assert "Показать статус всех компонентов" in output


def test_status_help_exposes_russian_copy(monkeypatch, capsys):
    import sys
    from hermes_cli import main as main_mod
    import pytest

    monkeypatch.setenv("HERMES_LANGUAGE", "ru")
    monkeypatch.setattr(sys, "argv", ["hermes", "status", "--help"])

    with pytest.raises(SystemExit) as exc:
        main_mod.main()

    assert exc.value.code == 0
    output = capsys.readouterr().out
    assert "Показать статус всех компонентов" in output
    assert "Показать все сведения" in output
