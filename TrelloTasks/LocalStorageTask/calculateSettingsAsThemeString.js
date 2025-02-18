export default function calculateSettingsAsThemeString(
  localStorageTheme,
  systemSettingDark
) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}
