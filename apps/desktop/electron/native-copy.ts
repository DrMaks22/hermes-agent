export interface NativeCopy {
  about: (appName: string) => string
  actualSize: string
  addContext: string
  addToDictionary: string
  backendAndAppUpdated: string
  backendStartFailed: (message: string) => string
  backendReadyFinalizing: string
  backendUpdatedDesktopBuildFailed: string
  backendUpdatedReopen: string
  backendUpdatedRestart: string
  bootstrapRequired: string
  checkForUpdates: string
  chooseDefaultProjectDirectory: string
  close: string
  copyImage: string
  copyImageAddress: string
  copyLink: string
  desktopBootFailed: (message: string) => string
  edit: string
  file: string
  help: string
  installingUpdatedApp: string
  keepRunning: string
  newWindow: string
  notGitCheckout: (root: string) => string
  openFolder: string
  openImage: string
  openLink: string
  quitAnyway: string
  quitDetail: string
  quitMessage: (count: number) => string
  quitMore: (count: number) => string
  rebuildingDesktop: string
  remoteBackendReady: string
  restartingDesktopConnection: string
  restartingHermes: string
  retryingDesktopRebuild: string
  runtimeReady: string
  saveImage: string
  saveImageAs: string
  signInCloud: string
  updateFailed: string
  updatingHermes: string
  updatingHermesWindowClose: string
  view: string
  waitingBackend: string
  waitingFirstRunChoice: string
  waitingFirstRunChoiceFor: (seconds: number) => string
  window: string
  zoomIn: string
  zoomOut: string
  uninstallerAgentMissing: (root: string) => string
}

function russianMore(count: number): string {
  return `ещё ${count}`
}

function russianChatWord(count: number): string {
  return count % 10 === 1 && count % 100 !== 11 ? 'чате' : 'чатах'
}

const ENGLISH: NativeCopy = {
  about: appName => `About ${appName}`,
  actualSize: 'Actual Size',
  addContext: 'Add context',
  addToDictionary: 'Add to dictionary',
  backendAndAppUpdated: 'Backend + app updated. Restart Hermes to load the new version.',
  backendStartFailed: message => `Hermes backend failed to start: ${message}`,
  backendReadyFinalizing: 'Hermes backend is ready. Finalizing desktop startup',
  backendUpdatedDesktopBuildFailed: 'Backend updated, but the desktop rebuild failed. Restart Hermes to retry.',
  backendUpdatedReopen: 'Backend updated. Quit and reopen Hermes to load the new version.',
  backendUpdatedRestart: 'Backend updated. Restart Hermes to load the new version.',
  bootstrapRequired: 'Hermes Agent not installed yet; bootstrap required',
  checkForUpdates: 'Check for Updates…',
  chooseDefaultProjectDirectory: 'Choose default project directory',
  close: 'Close',
  copyImage: 'Copy Image',
  copyImageAddress: 'Copy Image Address',
  copyLink: 'Copy Link',
  desktopBootFailed: message => `Desktop boot failed: ${message}`,
  edit: 'Edit',
  file: 'File',
  help: 'Help',
  installingUpdatedApp: 'Installing the updated app and restarting…',
  keepRunning: 'Keep Running',
  newWindow: 'New Window',
  notGitCheckout: root => `${root} isn't a git checkout — desktop self-update only runs against a source install.`,
  openFolder: 'Open Folder…',
  openImage: 'Open Image',
  openLink: 'Open Link',
  quitAnyway: 'Quit Anyway',
  quitDetail: 'Quitting now can interrupt work mid-turn. Detached background processes will continue.',
  quitMessage: count => `Hermes is still working on ${count} chat${count === 1 ? '' : 's'}.`,
  quitMore: count => `${count} more`,
  rebuildingDesktop: 'Rebuilding the desktop app…',
  remoteBackendReady: 'Remote Hermes backend is ready',
  restartingDesktopConnection: 'Restarting desktop connection',
  restartingHermes: 'Restarting Hermes…',
  retryingDesktopRebuild: 'Retrying the desktop rebuild…',
  runtimeReady: 'Hermes runtime is ready',
  saveImage: 'Save Image',
  saveImageAs: 'Save Image As…',
  signInCloud: 'Sign in to Hermes Cloud',
  updateFailed: 'hermes update failed.',
  updatingHermes: 'Updating Hermes (git + dependencies)…',
  updatingHermesWindowClose:
    'Updating Hermes — this window will close and the updater will open. Don’t reopen Hermes yourself; it restarts automatically when the update finishes.',
  view: 'View',
  waitingBackend: 'Waiting to start Hermes backend',
  waitingFirstRunChoice: 'Waiting for first-run setup choice',
  waitingFirstRunChoiceFor: seconds => `Still waiting for first-run setup choice after ${seconds} seconds`,
  window: 'Window',
  zoomIn: 'Zoom In',
  zoomOut: 'Zoom Out',
  uninstallerAgentMissing: root => `Can't run the uninstaller: no Hermes agent venv at ${root}.`
}

const RUSSIAN: NativeCopy = {
  about: appName => `О приложении ${appName}`,
  actualSize: 'Фактический размер',
  addContext: 'Добавить контекст',
  addToDictionary: 'Добавить в словарь',
  backendAndAppUpdated: 'Бэкенд и приложение обновлены. Перезапустите Hermes, чтобы загрузить новую версию.',
  backendStartFailed: message => `Не удалось запустить бэкенд Hermes: ${message}`,
  backendReadyFinalizing: 'Бэкенд Hermes готов. Завершаем запуск приложения',
  backendUpdatedDesktopBuildFailed:
    'Бэкенд обновлён, но пересобрать приложение не удалось. Перезапустите Hermes, чтобы повторить попытку.',
  backendUpdatedReopen: 'Бэкенд обновлён. Закройте и снова откройте Hermes, чтобы загрузить новую версию.',
  backendUpdatedRestart: 'Бэкенд обновлён. Перезапустите Hermes, чтобы загрузить новую версию.',
  bootstrapRequired: 'Hermes Agent ещё не установлен — требуется первоначальная установка',
  checkForUpdates: 'Проверить обновления…',
  chooseDefaultProjectDirectory: 'Выберите папку проектов по умолчанию',
  close: 'Закрыть',
  copyImage: 'Копировать изображение',
  copyImageAddress: 'Копировать адрес изображения',
  copyLink: 'Копировать ссылку',
  desktopBootFailed: message => `Не удалось запустить приложение: ${message}`,
  edit: 'Правка',
  file: 'Файл',
  help: 'Справка',
  installingUpdatedApp: 'Устанавливаем обновлённое приложение и перезапускаем Hermes…',
  keepRunning: 'Продолжить работу',
  newWindow: 'Новое окно',
  notGitCheckout: root =>
    `${root} не является Git-репозиторием — самостоятельное обновление приложения доступно только для установки из исходников.`,
  openFolder: 'Открыть папку…',
  openImage: 'Открыть изображение',
  openLink: 'Открыть ссылку',
  quitAnyway: 'Всё равно выйти',
  quitDetail: 'Выход сейчас может прервать работу посреди хода. Отсоединённые фоновые процессы продолжат выполняться.',
  quitMessage: count => `Hermes всё ещё работает в ${count} ${russianChatWord(count)}.`,
  quitMore: russianMore,
  rebuildingDesktop: 'Пересобираем приложение…',
  remoteBackendReady: 'Удалённый бэкенд Hermes готов',
  restartingDesktopConnection: 'Перезапускаем подключение приложения',
  restartingHermes: 'Перезапускаем Hermes…',
  retryingDesktopRebuild: 'Повторяем сборку приложения…',
  runtimeReady: 'Среда выполнения Hermes готова',
  saveImage: 'Сохранить изображение',
  saveImageAs: 'Сохранить изображение как…',
  signInCloud: 'Вход в Hermes Cloud',
  updateFailed: 'Не удалось выполнить hermes update.',
  updatingHermes: 'Обновляем Hermes (Git и зависимости)…',
  updatingHermesWindowClose:
    'Hermes обновляется — это окно закроется и откроется установщик. Не запускайте Hermes вручную: после обновления он перезапустится автоматически.',
  view: 'Вид',
  waitingBackend: 'Ожидаем запуска бэкенда Hermes',
  waitingFirstRunChoice: 'Ожидаем выбора способа первоначальной настройки',
  waitingFirstRunChoiceFor: seconds => `Ожидаем выбора способа первоначальной настройки уже ${seconds} с`,
  window: 'Окно',
  zoomIn: 'Увеличить',
  zoomOut: 'Уменьшить',
  uninstallerAgentMissing: root =>
    `Не удалось запустить удаление: по адресу ${root} не найдено виртуальное окружение Hermes Agent.`
}

export function nativeCopyForLocale(locale: string | undefined): NativeCopy {
  const language = locale?.trim().toLowerCase().split(/[-_]/)[0]

  return language === 'ru' ? RUSSIAN : ENGLISH
}

/**
 * Resolve the native copy for the app's current locale.
 *
 * `electron.app.getLocale()` is only safe to call after `app.whenReady()`
 * resolves; module-level evaluation of main.ts (e.g. boot-state text
 * during boot-progress wiring) runs before that. Fall back to the
 * system locale via `Intl` when Electron isn't ready yet so callers
 * never get a thrown or empty locale.
 *
 * `electron` is loaded lazily via `require` so importing this module
 * from tests or any renderer-shaped importer doesn't trigger
 * `electron.app.isReady()` at module load.
 */
export function currentNativeCopy(): NativeCopy {
  let locale: string | undefined

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const electron = require('electron') as typeof import('electron')
    if (electron.app.isReady()) {
      locale = electron.app.getLocale()
    }
  } catch {
    locale = undefined
  }

  if (!locale) {
    try {
      locale = Intl.DateTimeFormat().resolvedOptions().locale
    } catch {
      locale = undefined
    }
  }

  return nativeCopyForLocale(locale)
}
