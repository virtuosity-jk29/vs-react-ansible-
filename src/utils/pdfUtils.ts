import jsPDF from 'jspdf';
import { Device } from '../types/device';

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

export const generateDeviceConfigPDF = (devices: Device[]): void => {
  const pdf = new jsPDF();
  let yPos = 20;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 7;

  // Add title
  pdf.setFontSize(16);
  pdf.text('Network Devices Configuration Report', margin, yPos);
  yPos += lineHeight * 2;

  // Add generation date
  pdf.setFontSize(10);
  pdf.text(`Generated on: ${formatDate(new Date().toISOString())}`, margin, yPos);
  yPos += lineHeight * 2;

  devices.forEach((device, index) => {
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      pdf.addPage();
      yPos = 20;
    }

    // Device header
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text(`Device ${index + 1}: ${device.hostname}`, margin, yPos);
    yPos += lineHeight;

    // Device details
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    
    const details = [
      `Brand: ${device.brand}`,
      `Model: ${device.model}`,
      `IP Address: ${device.ipAddress}`,
      `Status: ${device.status}`,
      `OS Version: ${device.osVersion}`,
      `Location: ${device.location}`,
      `Last Scan: ${device.lastScan}`,
      `Last Backup: ${device.configs.lastBackup}`,
      `Configuration Status: ${device.configs.current ? 'Current' : 'Outdated'}`,
    ];

    details.forEach(detail => {
      // Check if we need a new page
      if (yPos > pageHeight - 20) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text(detail, margin + 5, yPos);
      yPos += lineHeight;
    });

    // Add spacing between devices
    yPos += lineHeight;
  });

  // Save the PDF
  pdf.save('device-configurations.pdf');
};