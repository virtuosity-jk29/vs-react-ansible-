export interface Device {
  id: string;
  hostname: string;
  brand: string;
  model: string;
  ipAddress: string;
  status: 'compliant' | 'non-compliant';
  lastScan: string;
  osVersion: string;
  location: string;
  configs: {
    current: boolean;
    backupExists: boolean;
    lastBackup: string;
  };
}