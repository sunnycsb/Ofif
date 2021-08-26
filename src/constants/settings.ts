import { ISettings } from '~/interfaces';
import { remote, app } from 'electron';

export const DEFAULT_SEARCH_ENGINES = [
  {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=%s',
    keywordsUrl: 'duckduckgo.com',
    keyword: 'duckduckgo.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACT1BMVEUAAAD/gFXfWjbeWTPfWDTeWDTeWDPfYDXfWDPeWTT/bUngWDPfWTPfWDPjWTfeWTTjWzPeWTTeWDPkelzrnojvr53ywLLibEvxuKj77en66OPyvq/urJrrm4XgYj/ws6P88/HvsqHjdFbfYT/jclP65uHywrThaUjmgmf88e/rmoTlfmLxuKnxvK7tpZLibk/mhWruqZf88e7////3187haEfpk3v43NX88u/rmoPgZELywbPgY0H1zsP88/DmgWX43NT87+zgZ0XvsaDoj3bf5e7Gz+D2+PvW3em2wtjks6nwt6fN1eT9+ffgZUP0yr/5+vzv8vehsM3H0OHrnonywLNkfaxRbqL3+ftVcaSKncDxuqvurZuntdB+k7r+/v/eWjPmdinumx3wnxvlcyrojXT//vb/99P/87z2v1r0rRb8ywz90gr6xQ7ha0v//vj+5nP90w/90Qr1shXpgyXeWzP+42X90AvxphnzqRjypxnsjSLhZi/+42T3uRLuq5n//O/2uyL0rxbriSLsjiHwoRr7yg3iaC7niW/icFHiZy7zrBf5whD3uhLumR3jdlf66uXqlH3zxrrYXDTdWTPso4/d8da136bq9uX99fPeXDjcWTSkhzxquEa4dznlf2PB5LRlvEZmvUeHyXNuvlVouUh7qkKohTzmg2ffXjv+/fzG5rpas0ZkvEajiDz54NrQ68dftU1atEZit06npl+ApUKrgjvzx7vp9uV3xFy24Kj4/Pb55N/eWTXdeVfus6H77+v44Nr44Nn54tz76uYtKC1GAAAAEnRSTlMABkeVv9nzGJbxB4L0xy7jLfK6UobZAAACRklEQVQ4y4VT9XsTQRC9aKMEJsnFrb0kTbDSoUWKF5eixa24HO4Eihco7i6Lu7u35Q/jbu/2uLQfH/PTzs7bmdk3bzhOM4PRZLZYrRazyWjgOlqJzQ5en5/n/T4v2G0l7cIOpysQDIUj0VgsGgmHggGX01H03B1PJFOloFppKpkoc+uSdPII6UwWdJbNpAVPZ+29pzyXh67duvfo+ReSz5V71BwOt5CrAOhViYi9BQ1RkRPcSh/OeDovXVRVVfdB7NuvP0PE0nEnLeBK1Mj+gIFIbdBghsgkXHIRWyBJ+xuCqg0dxjpNBmwSf/ZgrewNxxEjR8nx0WPGshSpoN3AGSFE/z8Ox7MUE+oYHyEwciZvmDoTESdNpvEpU6tZirDXxJmnRei5HnH6jJkyYNbsOQwQ8Zk5iz9Kz3MR582nGRZgPSxsWLR4CUDUb+GsfIwClrIOli1fsXLValFc0yBRwVs1wFolvG79BlGyjZs2b5G54rtoJaCSAraK27bv2FnYpdzJJcw+pUlQiNwtNuqGKjfJvgl7KGDvPnF/4cDBQ41Nh9VvMqLgiNLE0ebCseNNJ042M6IkqlMUUKcATukqUKq1YcFpCjijkxUdljzuDPXPUoA8+nPn9eNmgoELePHSZbxy9dr1Gzep6NJlTr3k4BbeJnfu3rv/gJCHRZKTRPtIEi08fvKUkGeEPCfkRZFoFdnXZOHlK0Jev3n77j35UCx7dXFqP376/OUr4rfvP362Wxy2er9aWtvaWlt+d1y9/y/vv9f/DzYRmYvARwKBAAAAAElFTkSuQmCC',
  },
  {
    name: 'Qdex',
    url: 'https://qdex.app/search?q=%s',
    keywordsUrl: '',
    keyword: 'qdex.app',
    icon:
      'data:image/png;base64,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',
  },
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=%s',
    keywordsUrl: 'http://google.com/complete/search?client=chrome&q=%s',
    keyword: 'google.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACDVBMVEUAAAD+/v7+/v79/f39/f39/f39/f39/f3+/v7+/v79/f39/f39/f39/f3+/v7////9/f39/f39/f39/f3+/v7+/v79/f39/f3+/v7+/v79/f39/f3////+/v79/f3////9/f3+/v7+/v79/f39/f39/f3+/v7////9/f3+/v79/f39/f39/f3////9/f3////+/v7////85uT1pZ7wdGrsVUjqRjjqRTfsU0bvcmj1oZr85OL85+XxgXjqRDbqQzXxf3b3urXrSz7rTD/4v7r1p6DyioHuZVn0m5P3tK73ta/0m5TuZlryjob//v7rSj3tXFD5zMj5y8fsWEzzlIz0kG3vbGH+8vL+9fT+9t37uQfxdyD98O7934b7vAX1kxXrSTT3uLP8zUb5riH/+/v7whz801lChfS/1fv7vQf93H2lxfqfwfn80liqyPr8zkfkwi76/fve6v3B1/v934iztSE8qFCw3byox/rn8P7+9t/2vAmGsDM0qFNGsGLs9+/z9/5UkPVgmfaPx4JcuXXw+fL6/P93p/epyPrm9Oo+rFtMsmfC5cza7+BjsahChfH2+f634MJUtm6Nzp+q2rer27iV0qVkvHs1qFQ3oHdBiePD2Pyj2LE1pWA+jsq54cQ+rFw3qVab0rHn9et7xo82qVRnvn7X7t2h169swIJJsWU4qlZGsGNlvX3Y7t5rzgcKAAAAMXRSTlMADlqcy+367Fknn/f2nSUKjfz7iwkm1dIkMuvqMAuKD/UNV5nI+VYMmiOH09AI6CIvZ7+SkQAAAe5JREFUOMtjYIADRiZmFlY2NnYWZg5GBkzAycVtCAc8vHxo0vwCgoYoQEhYBFleVMwQA4hLIOQlpcBCRsYmpmbmFpZW1mCutAxcP1jextbOHgrsHGzAKqBmyILNd3SyRwLOLmBbIO4QALFd7VGBG9gWObD/QO53hAi7e3h6efsAGb5+EL+ALOECOc8fJB0QCHF/UHAIzCvMDAzyoPAJBcmHhcOEI+B+VVBkYAJSkVHR9vamMYZYgBIDM5CMjYuLT0jEJm+ozMACJJPi4uKSU7AqUGFgBZKpQAVpUJF0BMgABRYDG5DMBCrIwlSQDeSq4lOQA1bADrUiF1NBHtgKkCPzgQoKCpHdVgRSUAx2JMibJXFxpWXlyAoqQAoqwd7kAJJV1TW1tXX1CPmGRqB8E4ilxsDIA6Saa4GgpRUm39YOMqADFNTqDAy8QLqzC6Siuwci39vXD5RvnABkagBjk08IyJhYCwaTJk+ZOm36jNqZs9LTZwOF2TRBCUIYpGtOLQqYOw8UCIZakCSvDWLPX4CsYOEikJiOLiRRSkiDeIuXLIXLL1sOEtHThyVrGbAKw84VK1etXrhm7bR1YK6eASJjSIhjRrSOPnLWEpETQpVm09JFy50SzAoIaQUNTSz5W1FJWUVaVVVaRVlNHSEKACBb24XRQm7rAAAAAElFTkSuQmCC',
  },
  {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=%s',
    keywordsUrl: '',
    keyword: 'bing.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAANlBMVEUAfX3k8/MAiop7trYAgoL6//8AdXULhIT///+exMQ4l5ew0dFLoaG929v0+/vQ5+eVwsIcjo4kKiufAAAAZElEQVQYlY2QyQ6AMAhEpy0Fuqr//7NWo108OQcSHsMSICJEMoSWR8sLQNCCD/A/AEALYFMy3+wFQdWkg0aLNaoaMM3gbQaV3eVww9HKajL60KbqmJ61QrvXBPQ7WrCRp0vXB5xZ6wZZjwmZbQAAAABJRU5ErkJggg==',
  },
  {
    name: 'Ecosia',
    url: 'https://www.ecosia.org/search?q=%s',
    keywordsUrl: '',
    keyword: 'ecosia.org',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAylJREFUOI1Nk01sVFUYhp9z7r1zO1NK25ShtkxmSqE0VisWf0KbatkQ0USnEhPiwh+SGgkkLowQ6EKKWGgTNi4ICxtQMNFEMG1iMBqURKNMgtYwtKkUq20tFFoYxjudmc7ce+5xgdZ+2zfPu3m/R7Ds9P44oGOoYg9uoQ2IACaaG1jWMDJwDNNMiCODS4xYgg90gqFP4nk7/a1dyOZWCFffD527MDYMX5+CRecCwtr6X4lYgnEv6ujGLeKNwzjeON/+keTjiTBKCxrLVxBfH+Op2jD68+OIy0NTWKV14sgghu7uBJMPdHXjDrGnj/6fL1NMvc71tM25+QaigRlGnRzvX5tjau4W255/CSPtVIjZa+097U1nhD4Qh0VH03uexO2zdP+imSpGsKTHm2suEK89Q8EvI6dWEJJTmIEXWBs7idnzMixmn5Yo9yjtO/hLC1p/qCCjwqw0XJ4ovcGW8DdkvBqUH8IWPp6Oks0P8fdCAv+ZLvAKb0vcQhvNm/ny+gwNpkQIjRQeu+pPYwnNWKYJV5sAGMJDimrS6S/QjY+DKrZItFrtV0boqBxgQ/Aeed8iaqeIhS4hhKZ5ZRJLuBS1yW+ZjdhGDuVeRVeWAyIi0WitIWQoDj/4Hg+HZpnIV7MnOcBsPgZA0EzRO/4Wxye3c2pyF8l0C4YGwJdI4yZz09glLVhinptuGbZUjOVqmMnHsKXDuZmdjGZrcVSQT+ceQ5mPIu7eBpiWBEouyl+/Y1XVc7wz2o/jBZFoTOFTai6QV2Us+JqQ9JBocn6OhppnYeRHMAOJ+zPm04p3z8rTsw77hq8SswMoLVgXvIMpFFeyayiVLvOuxyt1EQ5tfgS644C5VuJrKK/az4l9vNpUz7FNDzFRcMn6HqPZKq4srEbrAr8XinSti3KorQX94UEwjU+QYvLfV34RDP8jQlWvsbufW8EKvhr/k5FUGuVrNlSUsW19HfW2RA/0IKaTCQi0ir7BZTJ1d4L291LI9PFkp2RTB6yqASnh3h0YuQTffwYloRN47BZHl8n0v87bQShwCwdRbgdaPQBCIEQKI/ATpr0XA0Tv0BLzDxefVnicNn0wAAAAAElFTkSuQmCC',
  }
];

export const DEFAULT_SETTINGS: ISettings = {
  theme: 'fifo-light',
  darkContents: false,
  shield: true,
  multrin: true,
  animations: true,
  bookmarksBar: true,
  suggestions: true,
  themeAuto: true,
  searchEngines: DEFAULT_SEARCH_ENGINES,
  searchEngine: 0,
  startupBehavior: {
    type: 'empty',
  },
  warnOnQuit: true,
  version: 3,
  downloadsDialog: false,
  downloadsPath: remote
    ? remote.app.getPath('downloads')
    : app
    ? app.getPath('downloads')
    : '',
  doNotTrack: true,
  topBarVariant: 'default',
};
