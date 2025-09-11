import sdk from '@/core';

import { ApiPlugin } from '@/plugins/api';
import { AppPlugin } from '@/plugins/app';
import { ClientPlugin } from '@/plugins/client';
import { ComponentsPlugin } from '@/plugins/components';
import { ConfigPlugin } from '@/plugins/config';
import { I18nPlugin } from '@/plugins/i18n';
import { StorePlugin } from '@/plugins/store';

import { Crumb, useCrumb, useIntl } from '@/common';

export {
  ApiPlugin,
  AppPlugin,
  ClientPlugin,
  ComponentsPlugin,
  ConfigPlugin,
  Crumb,
  I18nPlugin,
  sdk,
  StorePlugin,
  useCrumb,
  useIntl,
};
