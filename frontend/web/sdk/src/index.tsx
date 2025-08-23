import Sdk from '@/core';

import { ApiPlugin } from '@/plugins/api';
import { AppPlugin } from '@/plugins/app';
import { ComponentsPlugin } from '@/plugins/components';
import { HooksPlugin } from '@/plugins/hooks';
import { I18nPlugin } from '@/plugins/i18n';
import { LayoutPlugin } from '@/plugins/layout';
import { RouterPlugin } from '@/plugins/router';
import { StoragePlugin } from '@/plugins/storage';
import { StorePlugin } from '@/plugins/store';

const sdk = new Sdk();

export {
  ApiPlugin,
  AppPlugin,
  ComponentsPlugin,
  HooksPlugin,
  I18nPlugin,
  LayoutPlugin,
  RouterPlugin,
  sdk,
  StoragePlugin,
  StorePlugin,
};
