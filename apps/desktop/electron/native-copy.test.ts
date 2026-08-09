import { expect, test } from 'vitest'

import { nativeCopyForLocale } from './native-copy'

test('nativeCopyForLocale keeps English as the fallback', () => {
  expect(nativeCopyForLocale(undefined).file).toBe('File')
  expect(nativeCopyForLocale('de-DE').checkForUpdates).toBe('Check for Updates…')
})

test('nativeCopyForLocale recognizes Russian locale tags', () => {
  const copy = nativeCopyForLocale('ru_RU')

  expect(copy.file).toBe('Файл')
  expect(copy.saveImage).toBe('Сохранить изображение')
  expect(copy.copyImageAddress).toBe('Копировать адрес изображения')
  expect(copy.waitingBackend).toBe('Ожидаем запуска бэкенда Hermes')
  expect(copy.waitingFirstRunChoiceFor(12)).toBe('Ожидаем выбора способа первоначальной настройки уже 12 с')
  expect(copy.backendStartFailed('boom')).toBe('Не удалось запустить бэкенд Hermes: boom')
  expect(copy.desktopBootFailed('boom')).toBe('Не удалось запустить приложение: boom')
  expect(copy.notGitCheckout('/tmp/hermes')).toContain('/tmp/hermes не является Git-репозиторием')
  expect(copy.uninstallerAgentMissing('/tmp/venv')).toContain('/tmp/venv')
  expect(copy.quitMessage(1)).toBe('Hermes всё ещё работает в 1 чате.')
  expect(copy.quitMessage(5)).toBe('Hermes всё ещё работает в 5 чатах.')
})
