// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'hash',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/basic/point',
            },
            {
              path: '/basic',
              name: 'basic',
              routes: [
                {
                  path: '/basic/point',
                  name: 'point',
                  component: './basic/Point',
                },
                {
                  path: '/basic/rect',
                  name: 'rect',
                  component: './basic/Rect',
                },
                {
                  path: '/basic/coordinate',
                  name: 'coordinate',
                  component: './basic/Coordinate',
                },
                {
                  path: '/basic/transform',
                  name: 'transform',
                  component: './basic/Transform',
                },
                {
                  path: '/basic/cubic',
                  name: 'cubic',
                  component: './basic/Cubic',
                },
                {
                  path: '/basic/color',
                  name: 'color',
                  component: './basic/Color',
                },
                {
                  path: '/basic/cubicWithcolor',
                  name: 'cubicWithcolor',
                  component: './basic/CubicWithcolor',
                },

                {
                  path: '/basic/sunshine',
                  name: 'sunshine',
                  component: './basic/Sunshine',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  esbuild: {},
});
