const getOptions = () => {
  chrome.storage.sync.get(
    {
      menucontext: true,
      extension: true,
      merContext: true,
      itpContext: true,
      affContext: true,
      datafeed: true,
      sasUI: true,
      decoder: true,
      ftpCred: true,
      getMerchant: true,
      testMerchant: true,
      itp: true,
      getAffiliate: true,
      testAffiliate: true,
    },
    (items) => {
      if (
        items.menucontext &&
        (items.merContext ||
          items.itpContext ||
          items.testLinkContext ||
          items.affContext)
      ) {
        let contextOptions = {};

        items.merContext
          ? (contextOptions.merchant = "Go to Merchant: %s")
          : "";
        items.itpContext ? (contextOptions.itp = "Merchant ITP: %s") : "";
        items.affContext
          ? (contextOptions.affiliate = "Go to Affiliate: %s")
          : "";

        // Add a listener to create the initial context menu items,
        // context menu items only need to be created at runtime.onInstalled
        for (const [op, title] of Object.entries(contextOptions)) {
          chrome.contextMenus.create({
            id: op,
            title: title,
            type: "normal",
            contexts: ["selection"],
          });
        }

        // Open a new search tab when the user clicks a context menu
        chrome.contextMenus.onClicked.addListener((item, tab) => {
          let opId = item.menuItemId;
          let url;
          let validatedUrl;

          switch (opId) {
            case "merchant":
              validatedUrl =
                /^\d+$/.test(item.selectionText.trim()) &&
                parseInt(item.selectionText.trim()) > 95
                  ? `https://account.shareasale.com/admin/adminDetailsMerchant.cfm?merchantId=${item.selectionText.trim()}&searchby=${item.selectionText.trim()}`
                  : `https://account.shareasale.com/admin/index.cfm?searchby=${item.selectionText.trim()}&blnUserSearch=1&searchFor=merchants`;
              url = new URL(validatedUrl);
              break;
            case "itp":
              validatedUrl = `https://account.shareasale.com/admin/itp.cfm?merchantid=${item.selectionText.trim()}&searchby=${item.selectionText.trim()}`;
              url = new URL(validatedUrl);
              break;
            case "affiliate":
              validatedUrl =
                /^\d+$/.test(item.selectionText.trim()) &&
                parseInt(item.selectionText.trim()) > 24
                  ? `https://account.shareasale.com/admin/adminDetailsAffiliate.cfm?userid=${item.selectionText.trim()}&searchby=${item.selectionText.trim()}`
                  : `https://account.shareasale.com/admin/index.cfm?searchby=${item.selectionText.trim()}&blnUserSearch=1&searchFor=users`;
              url = new URL(validatedUrl);
              break;
          }

          chrome.tabs.create({ url: url.href, index: tab.index + 1 });
        });
      }
    } // end items
  );
};

getOptions();
