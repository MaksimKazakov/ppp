import { bodyFont } from './design-tokens.js';
import { css } from '../../lib/element/styles/css.js';
import { display } from '../../lib/utilities/style/display.js';
import { html, requireComponent } from '../../lib/template.js';
import { when } from '../../lib/element/templating/when.js';

import { plus } from './icons/plus.js';
import { charts } from './icons/charts.js';
import { laptop } from './icons/laptop.js';
import { settings } from './icons/settings.js';
import { support } from './icons/support.js';
import { arrowLeft } from './icons/arrow-left.js';

const page = (page) => {
  return when(
    (x) =>
      x.setPageTemplate(
        x.page === page &&
          requireComponent(
            `ppp-${page}-page`,
            `../${globalThis.ppp.realm}/${page}/${page}-page.js`
          )
      ),
    html`<ppp-${page}-page :app="${(x) => x}"></ppp-${page}-page>`
  );
};

export const appTemplate = (context, definition) => html`
  <template>
    <div class="holder">
      <div class="app-container">
        <${'ppp-side-nav'} ?expanded="${(x) => x.expanded}">
          <${'ppp-side-nav-item'}
            disabled
            ?active="${(x) => x.page === 'me'}"
            @click="${(x) => (x.page = 'me')}"
          >
            <span class="balance-icon" slot="start">💰‍</span>
            <span slot="title">
              <span class="balance">0,00</span>&nbsp;₽
            </span>
          </ppp-side-nav-item>
          <ppp-side-nav-item
            disabled
            @click="${(x) => x.handleNewTerminalClick()}"
          >
            ${plus({
              slot: 'start',
              cls: 'action-icon'
            })}
            <span slot="title">Новый терминал</span>
          </ppp-side-nav-item>
          <${'ppp-side-nav-group'}>
            ${charts({
              slot: 'start'
            })}
            <span slot="title">Торговля</span>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'analytics'}"
              @click="${(x) => (x.page = 'analytics')}"
              slot="items"
            >
              <span slot="title">Аналитика</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'trade-settings'}"
              @click="${(x) => (x.page = 'trade-settings')}"
              slot="items"
            >
              <span slot="title">Настройки</span>
            </ppp-side-nav-item>
          </ppp-side-nav-group>
          <ppp-side-nav-group>
            ${laptop({
              slot: 'start'
            })}
            <span slot="title">PPP</span>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'ppp-dashboard'}"
              @click="${(x) => (x.page = 'ppp-dashboard')}"
              slot="items"
            >
              <span slot="title">Обзор</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'ppp-billing'}"
              @click="${(x) => (x.page = 'ppp-billing')}"
              slot="items"
            >
              <span slot="title">Оплата</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'ppp-achievements'}"
              @click="${(x) => (x.page = 'ppp-achievements')}"
              slot="items"
            >
              <span slot="title">Достижения</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'ppp-settings'}"
              @click="${(x) => (x.page = 'ppp-settings')}"
              slot="items"
            >
              <span slot="title">Настройки</span>
            </ppp-side-nav-item>
          </ppp-side-nav-group>
          <ppp-side-nav-group>
            ${settings({
              slot: 'start'
            })}
            <span slot="title">Параметры</span>
            <ppp-side-nav-item
              ?active="${(x) => x.page === 'cloud-services'}"
              @click="${(x) => (x.page = 'cloud-services')}"
              slot="items"
            >
              <span slot="title">Облачные сервисы</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              disabled
              ?active="${(x) =>
                x.page === 'brokers' || x.page === 'new-broker'}"
              @click="${(x) => (x.page = 'brokers')}"
              slot="items"
            >
              <span slot="title">Брокеры</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'ssh-servers'}"
              @click="${(x) => (x.page = 'ssh-servers')}"
              slot="items"
            >
              <span slot="title">Машины SSH</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'warden-keys'}"
              @click="${(x) => (x.page = 'warden-keys')}"
              slot="items"
            >
              <span slot="title">Telegram Warden</span>
            </ppp-side-nav-item>
            <ppp-side-nav-item
              ?disabled="${(x) => !x.ppp?.keyVault.ok()}"
              ?active="${(x) => x.page === 'updates'}"
              @click="${(x) => (x.page = 'updates')}"
              slot="items"
            >
              <span slot="title">${i18n.t('update')}</span>
            </ppp-side-nav-item>
          </ppp-side-nav-group>
          <ppp-side-nav-group>
            ${support({
              slot: 'start'
            })}
            <span slot="title">${i18n.t('help')}</span>
            <ppp-side-nav-item
              disabled
              ?active="${(x) => x.page === 'guides'}"
              @click="${(x) => (x.page = 'guides')}"
              slot="items"
            >
              <span slot="title">Инструкции</span>
            </ppp-side-nav-item>
          </ppp-side-nav-group>
        </ppp-side-nav>
        <div class="page-content">
          ${page('cloud-services')}
          ${when((x) => x.ppp?.keyVault.ok(), page('updates'))}
          ${when(
            (x) =>
              !x.pageHasTemplate &&
              requireComponent(
                'ppp-not-found-page',
                `../${globalThis.ppp.realm}/not-found/not-found-page.js`
              ),
            html`<ppp-not-found-page :app="${(x) => x}"></ppp-not-found-page>`
          )}
        </div>
      </div>
    </div>
  </template>
`;

export const appStyles = (context, definition) =>
  css`
    ${display('flex')}

    :host {
      font-family: ${bodyFont};
      flex-direction: column;
      flex-grow: 1;
      position: relative;
      width: 100%;
    }

    .holder {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      position: relative;
      width: 100%;
    }

    .app-container,
    .page-content {
      display: flex;
      flex-grow: 1;
    }

    ppp-side-nav {
      flex-shrink: 0;
      z-index: 998;
    }

    .page-content {
      flex-direction: column;
      min-width: 0;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 20px;
    }

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 2px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
  `;
