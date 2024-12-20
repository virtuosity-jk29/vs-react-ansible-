import { Device } from '../types/device';

export const mockDevices: Device[] = [
  {
    id: '1',
    hostname: 'core-sw-01',
    brand: 'Cisco',
    model: 'Catalyst 9300',
    ipAddress: '192.168.1.1',
    status: 'compliant',
    lastScan: '2024-03-10 14:30',
    osVersion: 'IOS-XE 17.3.3',
    location: 'Main DC',
    configs: {
      current: true,
      backupExists: true,
      lastBackup: '2024-03-10 12:00'
    }
  },
  {
    id: '2',
    hostname: 'edge-rtr-01',
    brand: 'Juniper',
    model: 'MX240',
    ipAddress: '192.168.1.2',
    status: 'non-compliant',
    lastScan: '2024-03-10 14:30',
    osVersion: 'Junos 21.2R2',
    location: 'Main DC',
    configs: {
      current: false,
      backupExists: true,
      lastBackup: '2024-03-09 12:00'
    }
  },
  {
    id: '3',
    hostname: 'dist-sw-01',
    brand: 'Arista',
    model: 'DCS-7280SR3',
    ipAddress: '192.168.1.3',
    status: 'compliant',
    lastScan: '2024-03-10 14:30',
    osVersion: 'EOS-4.27.0F',
    location: 'Branch Office',
    configs: {
      current: true,
      backupExists: true,
      lastBackup: '2024-03-10 12:00'
    }
  },
  {
    id: '4',
    hostname: 'fw-01',
    brand: 'Palo Alto',
    model: 'PA-5250',
    ipAddress: '192.168.1.4',
    status: 'non-compliant',
    lastScan: '2024-03-10 14:30',
    osVersion: 'PAN-OS 10.1.0',
    location: 'Main DC',
    configs: {
      current: false,
      backupExists: true,
      lastBackup: '2024-03-08 12:00'
    }
  }
];