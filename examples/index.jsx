/**
 * @file entry of this example.
 * @author liaoxuezhi@cloud.com
 */

{/*
  <link rel="stylesheet" href="@fortawesome/fontawesome-free/css/all.css" />
  <link rel="stylesheet" href="@fortawesome/fontawesome-free/css/v4-shims.css" />
  <link rel="stylesheet" href="prismjs/themes/prism.css" />
  <!--DEPENDENCIES_INJECT_PLACEHOLDER-->
  <link rel="stylesheet" href="../node_modules/github-markdown-css/github-markdown-light.css" />
  <link rel="stylesheet" href="./doc.css" />

  <link rel="stylesheet" href="./style.scss" /> */}
import './static/iconfont.css'
import './static/officefont.css'
import './doc.css'
import './style.scss'
import './mod.js'
import './polyfills/index';
import React, {useEffect} from 'react';

import {createRoot} from 'react-dom/client';
import App from './components/App';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    // 由于延迟加载导致初始锚点经常不正确
    // 延迟再设置一下锚点，这个问题暂时没想到其它方法
    setTimeout(() => {
      if (location.hash) {
        const hash = location.hash.split('#')[1];
        const anchor = document.querySelector(`a[name="${hash}"]`);
        if (anchor) {
          anchor.scrollIntoView();
        }
      }
    }, 2000);
  });

  return <App />;
}

const root = createRoot(document.getElementById('root'));
root.render(<AppWithCallbackAfterRender />);
