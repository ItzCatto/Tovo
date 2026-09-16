import type { SettingCategory } from './types'

export const settingsCategories: SettingCategory[] = [
  {
    id: 'display',
    label: 'Display',
    icon: 'display',
    groups: [
      {
        title: 'Picture',
        rows: [
          { id: 'resolution', label: 'Resolution', type: 'select', value: '3840 × 2160', options: ['1280 × 720', '1920 × 1080', '3840 × 2160'] },
          { id: 'hdr', label: 'HDR', description: 'Automatically enable HDR for supported content', type: 'toggle', value: true },
          { id: 'motion', label: 'Motion Smoothing', type: 'toggle', value: false },
          { id: 'picture-mode', label: 'Picture Mode', type: 'select', value: 'Cinema', options: ['Vivid', 'Standard', 'Cinema', 'Game'] },
        ],
      },
      {
        title: 'Screen',
        rows: [
          { id: 'brightness', label: 'Brightness', type: 'slider', value: 68 },
          { id: 'screensaver', label: 'Screen Saver', type: 'select', value: 'After 10 minutes', options: ['After 5 minutes', 'After 10 minutes', 'After 30 minutes', 'Never'] },
        ],
      },
    ],
  },
  {
    id: 'sound',
    label: 'Sound',
    icon: 'sound',
    groups: [
      {
        title: 'Output',
        rows: [
          { id: 'audio-output', label: 'Audio Output', type: 'select', value: 'TV Speakers', options: ['TV Speakers', 'Optical Audio', 'HDMI ARC', 'Bluetooth'] },
          { id: 'surround', label: 'Surround Sound', type: 'toggle', value: true },
          { id: 'dialogue', label: 'Dialogue Boost', type: 'toggle', value: false },
        ],
      },
      {
        title: 'Volume',
        rows: [
          { id: 'volume', label: 'Default Volume', type: 'slider', value: 40 },
          { id: 'night-mode', label: 'Night Mode Audio', description: 'Reduce loud effects during late hours', type: 'toggle', value: false },
        ],
      },
    ],
  },
  {
    id: 'network',
    label: 'Network',
    icon: 'network',
    groups: [
      {
        title: 'Connection',
        rows: [
          { id: 'wifi', label: 'Wi-Fi Network', type: 'info', value: 'Tovo Living Room · Connected' },
          { id: 'wifi-toggle', label: 'Wi-Fi', type: 'toggle', value: true },
          { id: 'ethernet', label: 'Ethernet', type: 'toggle', value: false },
          { id: 'speed-test', label: 'Run Speed Test', type: 'action' },
        ],
      },
    ],
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: 'apps',
    groups: [
      {
        title: 'Manage',
        rows: [
          { id: 'installed', label: 'Installed Apps', type: 'info', value: '12 apps' },
          { id: 'auto-update', label: 'Auto-Update Apps', type: 'toggle', value: true },
          { id: 'clear-cache', label: 'Clear App Cache', type: 'action' },
        ],
      },
    ],
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: 'accounts',
    groups: [
      {
        title: 'Profile',
        rows: [
          { id: 'profile', label: 'Signed in as', type: 'info', value: 'Guest Profile' },
          { id: 'manage-profiles', label: 'Manage Profiles', type: 'action' },
          { id: 'sign-out', label: 'Sign Out', type: 'action' },
        ],
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: 'privacy',
    groups: [
      {
        title: 'Data',
        rows: [
          { id: 'viewing-history', label: 'Save Viewing History', type: 'toggle', value: true },
          { id: 'personalized-ads', label: 'Personalized Recommendations', type: 'toggle', value: true },
          { id: 'diagnostics', label: 'Share Diagnostic Data', type: 'toggle', value: false },
          { id: 'reset-data', label: 'Reset Viewing Data', type: 'action' },
        ],
      },
    ],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: 'accessibility',
    groups: [
      {
        title: 'Vision',
        rows: [
          { id: 'high-contrast', label: 'High Contrast UI', type: 'toggle', value: false },
          { id: 'text-size', label: 'Text Size', type: 'select', value: 'Large', options: ['Standard', 'Large', 'Extra Large'] },
          { id: 'audio-desc', label: 'Audio Descriptions', type: 'toggle', value: false },
        ],
      },
      {
        title: 'Captions',
        rows: [
          { id: 'captions', label: 'Closed Captions', type: 'toggle', value: true },
          { id: 'caption-size', label: 'Caption Size', type: 'select', value: 'Medium', options: ['Small', 'Medium', 'Large'] },
        ],
      },
    ],
  },
  {
    id: 'remotes',
    label: 'Remotes & Devices',
    icon: 'remote',
    groups: [
      {
        title: 'Paired Devices',
        rows: [
          { id: 'remote-1', label: 'Tovo Voice Remote', type: 'info', value: 'Battery 82% · Connected' },
          { id: 'headphones', label: 'Living Room Headphones', type: 'info', value: 'Battery 54% · Connected' },
          { id: 'pair-new', label: 'Pair New Device', type: 'action' },
        ],
      },
    ],
  },
  {
    id: 'inputs',
    label: 'Inputs',
    icon: 'inputs',
    groups: [
      {
        title: 'HDMI',
        rows: [
          { id: 'hdmi-1', label: 'HDMI 1', type: 'info', value: 'Console' },
          { id: 'hdmi-2', label: 'HDMI 2', type: 'info', value: 'Soundbar' },
          { id: 'hdmi-3', label: 'HDMI 3', type: 'info', value: 'Not Connected' },
          { id: 'cec', label: 'HDMI-CEC Control', type: 'toggle', value: true },
        ],
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    icon: 'system',
    groups: [
      {
        title: 'About',
        rows: [
          { id: 'version', label: 'Tovo OS Version', type: 'info', value: '4.2.1' },
          { id: 'storage', label: 'Storage Used', type: 'info', value: '18.4 GB of 32 GB' },
          { id: 'update', label: 'Check for Updates', type: 'action' },
          { id: 'restart', label: 'Restart Tovo', type: 'action' },
          { id: 'factory-reset', label: 'Factory Reset', type: 'action' },
        ],
      },
    ],
  },
]
