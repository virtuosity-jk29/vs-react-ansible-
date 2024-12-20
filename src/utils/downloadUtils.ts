import { Device } from '../types/device';

export const downloadDeviceConfig = async (device: Device): Promise<void> => {
  // Simulate API call to get device config
  const config = `# Configuration for ${device.hostname}
Device Model: ${device.model}
OS Version: ${device.osVersion}
Last Backup: ${device.configs.lastBackup}
`;

  const blob = new Blob([config], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${device.hostname}-config.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadSelectedConfigs = async (devices: Device[]): Promise<void> => {
  // Simulate API call to get multiple device configs
  const configs = devices.map(device => `# Configuration for ${device.hostname}
Device Model: ${device.model}
OS Version: ${device.osVersion}
Last Backup: ${device.configs.lastBackup}
`).join('\n\n');

  const blob = new Blob([configs], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'device-configs.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};