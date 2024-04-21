window.addEventListener("load", () => {
  // Creating components
  const createComponent = (el, id = "added-element", classes) => {
    let newElement = document.createElement(el);
    newElement.id = id;
    classes.length > 0
      ? classes.forEach((cl) => newElement.classList.add(cl))
      : "";

    document.querySelector("body").append(newElement);
    return id
      ? document.querySelector("body").querySelector(`#${id}`)
      : document.querySelector("body").querySelector("#added-element");
  };

  // Handling events
  const eventsHandler = (target, elements, event, callBack) => {
    target.addEventListener(event, (evt) => {
      callBack(elements, evt);
    });
  };

  // Decode URL
  const decodeUrl = (inp, container) => {
    let decodedUrl = decodeURIComponent(inp);
    let mainUrl =
      decodedUrl.indexOf("?") > 0 ? decodedUrl.split("?")[0] : false;
    let queryParams = mainUrl
      ? decodedUrl.split("?")[1].split("&")
      : decodedUrl.split("&");
    container.value = "";
    mainUrl ? (container.value = `${mainUrl}\n\n`) : "";
    queryParams.forEach((param, index) => {
      index == 0
        ? (container.value = container.value + `${param}`)
        : (container.value = container.value + `\n${param}`);
    });
    container.scrollTop = 0;
    container.scrollLeft = 0;
  };
  // Generate FTP Credentials
  let generateFTP = (input, container) => {
    container.value = "";
    let output;
    const inputString = input;

    const containsUsernameOrPassword = /Username:|Password:/i.test(inputString);
    const noCredFound = /No Username or Password found/i.test(inputString);

    if (containsUsernameOrPassword) {
      let newInput = input.replace(/(\r\n|\n|\r)/gm, "");
      newInput = newInput.replace("Username: ", "<br>Username: <strong>");
      newInput = newInput.replace(
        "Password: ",
        "</strong> \n<br>Password: <strong>"
      );
      newInput = newInput + "</strong>";
      output = `FTP Credentials. \n${newInput}`;
    }

    if (!noCredFound) {
      container.value = output
        ? output
        : `No Username or Password found.\n\n${input}`;
    } else {
      container.value = input;
    }
    container.scrollTop = 0;
    container.scrollLeft = 0;
  };
  // Cleaning Inputs
  const cleanInputs = (element) => {
    let inputs = element.querySelectorAll("input");
    element.querySelector("#get-merchant")
      ? element
          .querySelector("#get-merchant")
          .classList.add("menu-container__button_deactive")
      : "";
    element.querySelector("#itp-merchant")
      ? element
          .querySelector("#itp-merchant")
          .classList.add("menu-container__button_deactive")
      : "";
    element.querySelector("#get-affiliate")
      ? element
          .querySelector("#get-affiliate")
          .classList.add("menu-container__button_deactive")
      : "";
    inputs.forEach((inp) => {
      inp.value = "";
    });
  };

  // Handling Options
  const handleOptions = (options, container) => {
    let extensionButton = document.createElement("div");
    extensionButton.classList.add("extension-button");
    extensionButton.innerHTML = `
    <svg
        class="extension-button__logo"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 182.24 347.97"
        style="enable-background: new 0 0 182.24 347.97"
        xml:space="preserve">
        <g>
          <path
            class="extension-button__logo-path"
            d="M182.24,301.91c-13.65,6.12-26.55,13.7-39.84,20.51c-11.98,6.15-23.84,12.52-35.77,18.78
		c-5.02,2.63-10.19,4.79-15.79,5.98c-17.38,3.68-29.45-5.61-30.51-23.44c-0.58-9.78,1.75-19.19,3.32-28.68
		c3.67-22.14,7.6-44.23,11.49-66.34c0.47-2.66,0.05-4.66-2.03-6.67c-18.65-18.06-37.18-36.26-55.79-54.37
		c-5.02-4.89-9.92-9.85-13.36-16.05c-8.11-14.6-3.55-28.06,11.69-34.95c10.06-4.55,20.94-5.06,31.59-6.67
		c21.53-3.25,43.09-6.31,64.66-9.33c3.09-0.43,4.91-1.69,6.32-4.59c11.71-24.07,23.62-48.05,35.45-72.06
		c3.18-6.47,6.93-12.53,12.37-17.37c4.61-4.11,9.85-6.77,16.21-6.65C182.24,100.64,182.24,201.27,182.24,301.91z" />
        </g>
      </svg>
      <svg
        class="extension-button__close-button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512">
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    `;
    container.append(extensionButton);

    let contentBody = document.createElement("div");
    contentBody.classList.add("menu");
    contentBody.innerHTML = `
    <!-- menu-header -->
    <div class="menu-header">
      <img
        class="menu-header__logo"
        src="https://theme.zdassets.com/theme_assets/11797871/fd12ce8894cfe6d1ac3d51c12751f0764d93522d.png"
        alt="ShareASale logo image" />
    </div>
    <!-- end menu-header -->
    <!-- menu-content -->
    <div class="menu-content">
    </div>
    <!-- end menu-content -->
    `;
    let contentContainer = contentBody.querySelector(".menu-content");

    // Create First Container (SASUI & DATAFEED & TEST ACCOUNTS)
    if (
      options.sasUI ||
      options.datafeed ||
      options.testMerchant ||
      options.testAffiliate
    ) {
      let firstContainer = document.createElement("div");
      firstContainer.classList.add("menu-container");
      options.sasUI
        ? (firstContainer.innerHTML += `
          <a class="menu-container__button" id="sas-ui" href="https://account.shareasale.com/admin/index.cfm" target="_parent">SAS UI</a>`)
        : "";
      options.datafeed
        ? (firstContainer.innerHTML += `
          <a class="menu-container__button" id="datafeed" href="https://account.shareasale.com/admin/datafeedqueue.cfm" target="_parent">Datafeed</a>`)
        : "";
      options.testMerchant
        ? (firstContainer.innerHTML += `
        <a class="menu-container__button" id="test-merchant" href="https://account.shareasale.com/admin/adminDetailsMerchant.cfm?merchantId=44911&searchby=44911" target="_parent" >
          Test Merchant
        </a>
      `)
        : "";
      options.testAffiliate
        ? (firstContainer.innerHTML += `
        <a class="menu-container__button" id="test-affiliate" href="https://account.shareasale.com/admin/adminDetailsAffiliate.cfm?userid=178&searchby=178" target="_parent" >
          Test Affiliate
        </a>
      `)
        : "";
      contentContainer.append(firstContainer);
    }

    // Create Second Container (DECODER & FTP)
    if (options.decoder || options.ftpCred) {
      let secondContainer = document.createElement("div");
      secondContainer.classList.add("menu-container");
      let leftDiv = document.createElement("div");
      leftDiv.classList.add("menu-container__left");

      options.ftpCred
        ? (leftDiv.innerHTML += `
        <button class="menu-container__button" id="ftp">
          Generate FTP Cred.
        </button>
        <div class="menu-container__button menu-container__button_delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
          </svg>
        </div>
        
      `)
        : "";
      options.decoder
        ? (leftDiv.innerHTML += `
        <button class="menu-container__button" id="decoder">
          Decode URL
        </button>        
      `)
        : "";
      !options.ftpCred
        ? (leftDiv.innerHTML += `
        <div class="menu-container__button menu-container__button_delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
          </svg>
        </div>
        
      `)
        : "";
      secondContainer.append(leftDiv);
      secondContainer.innerHTML += `
      <div class="menu-container__right menu-container__right_bigh">
        <textarea
          class="menu-container__input menu-container__result" 
          id="dec-ftp-input" 
          name="result"
          placeholder="URL or FTP Credentials"></textarea>
      </div>
      `;
      contentContainer.append(secondContainer);
    }

    // Create Third Container (MERCHANT & AFFILIATE)
    if (options.getMerchant || options.itp || options.getAffiliate) {
      let thirdContainer = document.createElement("div");
      thirdContainer.classList.add("menu-container");

      if (options.getMerchant || options.itp) {
        let leftCont = document.createElement("div");
        leftCont.classList.add("menu-container__left");
        leftCont.classList.add("menu-container__left_mid");
        leftCont.innerHTML = `
      <div class="menu-container__header">
        <h4 class="menu-container__title">Merchant</h4>
      </div>
      `;

        options.getMerchant || options.itp
          ? (leftCont.innerHTML += `
        <input
        type="text"
        class="menu-container__input menu-container__input_merchant"
        name="input_0${Math.floor(Math.random() * 100000)}"
        placeholder="Merchant ID"></input>
      `)
          : "";

        options.getMerchant
          ? (leftCont.innerHTML += `
        <a class="menu-container__button menu-container__button_deactive" id="get-merchant" href="#" target="_parent" >
          Get Merchant
        </a>
      `)
          : "";

        options.itp
          ? (leftCont.innerHTML += `
        <a class="menu-container__button menu-container__button_deactive" id="itp-merchant" href="#" target="_parent" >
          Check ITP
        </a>
      `)
          : "";

        options.getAffiliate
          ? ""
          : (leftCont.classList.remove("menu-container__left_mid"),
            leftCont.classList.add("menu-container__left_full"));
        thirdContainer.append(leftCont);
      }
      if (options.getAffiliate) {
        let rightCont = document.createElement("div");
        rightCont.classList.add("menu-container__right");
        rightCont.classList.add("menu-container__right_mid");
        rightCont.innerHTML = `
      <div class="menu-container__header">
        <h4 class="menu-container__title">Affiliate</h4>
      </div>
      `;

        options.getAffiliate
          ? (rightCont.innerHTML += `
          <input
          type="text"
          class="menu-container__input menu-container__input_affiliate"
          name="input_1${Math.floor(Math.random() * 100000)}"
          placeholder="Affiliate ID"></input>
          <a class="menu-container__button menu-container__button_deactive" id="get-affiliate" href="#" target="_parent" >
            Get Affiliate
          </a>
      `)
          : "";

        options.getMerchant || options.itp
          ? ""
          : (rightCont.classList.remove("menu-container__left_mid"),
            rightCont.classList.add("menu-container__left_full"));
        thirdContainer.append(rightCont);
      }
      contentContainer.append(thirdContainer);
    }

    let footer = document.createElement("div");
    footer.classList.add("menu-footer");
    footer.innerHTML = `<p class="menu-footer__button">Hide Extension</p>`;
    contentBody.append(footer);
    container.append(contentBody);

    // Handle Merchant Buttons and input
    if (options.getMerchant || options.itp) {
      let merchantInput = contentBody.querySelector(
        ".menu-container__input_merchant"
      );
      let merchantGet = options.getMerchant
        ? contentBody.querySelector("#get-merchant")
        : "";
      let merchantItp = options.itp
        ? contentBody.querySelector("#itp-merchant")
        : "";
      merchantInput.onkeyup = (evt) => {
        if (options.getMerchant) {
          merchantGet.href =
            /^\d+$/.test(evt.target.value.trim()) &&
            parseInt(evt.target.value.trim()) > 95
              ? `https://account.shareasale.com/admin/adminDetailsMerchant.cfm?merchantId=${evt.target.value.trim()}&searchby=${evt.target.value.trim()}`
              : `https://account.shareasale.com/admin/index.cfm?searchby=${evt.target.value.trim()}&blnUserSearch=1&searchFor=merchants`;

          parseInt(evt.target.value.trim().length) > 1
            ? merchantGet.classList.remove("menu-container__button_deactive")
            : merchantGet.classList.add("menu-container__button_deactive");
        }
        if (options.itp) {
          merchantItp.href = `https://account.shareasale.com/admin/itp.cfm?merchantid=${evt.target.value.trim()}`;

          /^\d+$/.test(evt.target.value.trim()) &&
          parseInt(evt.target.value.trim()) > 95
            ? merchantItp.classList.remove("menu-container__button_deactive")
            : merchantItp.classList.add("menu-container__button_deactive");
        }
      };
    }
    // Handle Affiliate Buttons and input
    if (options.getAffiliate) {
      let affiliateInput = contentBody.querySelector(
        ".menu-container__input_affiliate"
      );
      let affiliateGet = contentBody.querySelector("#get-affiliate");
      affiliateInput.onkeyup = (evt) => {
        affiliateGet.href =
          /^\d+$/.test(evt.target.value.trim()) &&
          parseInt(evt.target.value.trim()) > 24
            ? `https://account.shareasale.com/admin/adminDetailsAffiliate.cfm?userid=${evt.target.value.trim()}&searchby=${evt.target.value.trim()}`
            : `https://account.shareasale.com/admin/index.cfm?searchby=${evt.target.value.trim()}&blnUserSearch=1&searchFor=users`;

        parseInt(evt.target.value.trim().length) > 1
          ? affiliateGet.classList.remove("menu-container__button_deactive")
          : affiliateGet.classList.add("menu-container__button_deactive");
      };
    }
    // Handle Decoder and FTP Buttons and input
    if (options.decoder || options.ftpCred) {
      let decftpInput = contentBody.querySelector("#dec-ftp-input");
      let decButton = options.decoder
        ? contentBody.querySelector("#decoder")
        : "";
      let ftpButton = options.ftpCred ? contentBody.querySelector("#ftp") : "";
      let deleteButton = contentBody.querySelector(
        ".menu-container__button_delete"
      );

      options.decoder
        ? decButton.addEventListener("click", () => {
            decodeUrl(decftpInput.value, decftpInput);
          })
        : "";
      options.ftpCred
        ? ftpButton.addEventListener("click", () => {
            decftpInput.value.length > 15
              ? generateFTP(decftpInput.value, decftpInput)
              : "";
          })
        : "";
      deleteButton.addEventListener("click", () => {
        decftpInput.value = "";
        decftpInput.scrollTop = 0;
        decftpInput.scrollLeft = 0;
      });
    }
  };

  // Generating components
  const handleComponents = (optionsItems, element, container) => {
    //adding element attributes
    element.title = "SAS Internal Extension";
    element.style =
      "width: 40px; height: 70px; position: fixed; bottom: 75px; right: 0px; border: none; background: transparent; z-index: 100";

    // Create style elements
    let styleLink = document.createElement("link");
    styleLink.type = "text/css";
    styleLink.rel = "stylesheet";
    styleLink.href =
      "https://arthurfms.github.io/sas-extension/source/source.css";
    let resetLink = document.createElement("link");
    resetLink.type = "text/css";
    resetLink.rel = "stylesheet";
    resetLink.href =
      "https://arthurfms.github.io/sas-extension/source/reset.css";

    let font1 = document.createElement("link");
    let font2 = document.createElement("link");
    let font3 = document.createElement("link");
    font1.rel = "preconnect";
    font1.href = "https://fonts.googleapis.com";
    font2.rel = "preconnect";
    font2.href = "https://fonts.gstatic.com";
    font3.rel = "stylesheet";
    font3.href =
      "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";

    // Append style elements
    element.contentWindow.document.head.append(font1);
    element.contentWindow.document.head.append(font2);
    element.contentWindow.document.head.append(font3);
    element.contentWindow.document.head.append(resetLink);
    element.contentWindow.document.head.append(styleLink);

    //Handling body
    container.classList.add("sas-extension");
    handleOptions(optionsItems, container);
  };

  // Getting Options
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
          items.extension &&
          (items.datafeed ||
            items.sasUI ||
            items.decoder ||
            items.ftpCred ||
            items.getMerchant ||
            items.testMerchant ||
            items.itp ||
            items.getAffiliate ||
            items.testAffiliate)
        ) {
          // Handle the page
          let exIframe = createComponent("iframe", "sas-iframe", [
            "sas-extension-iframe",
          ]);
          handleComponents(
            items,
            exIframe,
            exIframe.contentWindow.document.body
          );

          // Adding Openning and closing Event Listener
          let iframeBody = exIframe.contentWindow.document.body;
          let handlerButton = iframeBody.querySelector(".extension-button");
          // Open and close by clicking at the button
          eventsHandler(
            handlerButton,
            [exIframe, iframeBody],
            "click",
            (el) => {
              el[1].classList.toggle("sas-extension_active");
              if (el[1].classList.contains("sas-extension_active")) {
                (el[0].style.width = "445px"),
                  (el[0].style.height = `${
                    el[1].querySelector(".menu").scrollHeight + 120
                  }px`);
              } else {
                (el[0].style.width = "40px"), (el[0].style.height = "75px");
                cleanInputs(el[1]);
              }
            }
          );
          // Close when clicking out of the iframe
          eventsHandler(
            document,
            [exIframe, iframeBody],
            "click",
            (el, evt) => {
              (el[0].style.width = "40px"), (el[0].style.height = "75px");
              el[1].classList.remove("sas-extension_active");
              cleanInputs(el[1]);
            }
          );
          // Close when clicking at close button
          let closeButton = iframeBody.querySelector(".menu-footer__button");
          eventsHandler(closeButton, [exIframe], "click", (el, evt) => {
            el[0].remove();
          });
          // Handle Dark theme
          if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme:dark)").matches &&
            document.querySelector("html").attributes["data-dark-theme"] !=
              undefined &&
            document.querySelector("html").attributes["data-color-mode"] !=
              undefined
          ) {
            if (
              document.querySelector("html").attributes["data-dark-theme"]
                .value == "dark" &&
              document.querySelector("html").attributes["data-color-mode"]
                .value == "auto"
            ) {
              iframeBody
                .querySelector(".extension-button")
                .classList.add("extension-button_dark");
            }
          }
        }
      }
    );
  };

  getOptions();
});
