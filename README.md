> [!IMPORTANT]  
> This repository adds [Firefox support by Felix Brunet](https://github.com/tomer8007/spotify-web-ads-remover/pull/2)
> and my own [fix for content script injection](https://github.com/bluelhf/spotify-web-ads-remover/commit/889e8fe310afd4566f64c42776d1f47f21c937c1) with Spotify's new hash- and nonce sources.

# Ad Blocker for Spotify Web
This is an experimental, simple chrome extension to remove audio ads on Spotify web player.
It's available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/spotify-ads-remover/mghhlojofjipigjobacbjdngmjafdeim?hl=iw&authuser=0) too.

## How ads are removed
Ads are removed by intercepting and then tampering with Spotify's state machine requests/updates on the fly. 

The states are modified so that states that represent ads are skipped over (pointing to the state afterwards). This is done in `ads_removal.js`.
