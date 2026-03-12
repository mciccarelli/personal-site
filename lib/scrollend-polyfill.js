const supported = typeof window == "undefined" ? true : "onscrollend" in window;

if (!supported) {
  const scrollendEvent = new Event("scrollend");
  const pointers = new Set();

  // Track if any pointer is active
  document.addEventListener(
    "touchstart",
    (e) => {
      for (let touch of e.changedTouches) pointers.add(touch.identifier);
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      for (let touch of e.changedTouches) pointers.delete(touch.identifier);
    },
    { passive: true }
  );

  document.addEventListener(
    "touchcancel",
    (e) => {
      for (let touch of e.changedTouches) pointers.delete(touch.identifier);
    },
    { passive: true }
  );

  // Map of scroll-observed elements.
  let observed = new WeakMap();

  // Forward and observe calls to a native method.
  function observe(proto, method, handler) {
    let native = proto[method];
    proto[method] = function () {
      let args = Array.prototype.slice.apply(arguments, [0]);
      native.apply(this, args);
      args.unshift(native);
      handler.apply(this, args);
    };
  }

  function onAddListener(originalFn, type, handler, options) {
    if (type != "scroll" && type != "scrollend") return;

    let scrollport = this;
    let data = observed.get(scrollport);
    if (data === undefined) {
      let timeout = 0;
      data = {
        scrollListener: (evt) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (pointers.size) {
              setTimeout(data.scrollListener, 100);
            } else {
              if (scrollport) {
                scrollport.dispatchEvent(scrollendEvent);
              }
              timeout = 0;
            }
          }, 100);
        },
        listeners: 0,
      };
      originalFn.apply(scrollport, ["scroll", data.scrollListener]);
      observed.set(scrollport, data);
    }
    data.listeners++;
  }

  function onRemoveListener(originalFn, type, handler) {
    if (type != "scroll" && type != "scrollend") return;
    let scrollport = this;
    let data = observed.get(scrollport);

    if (data === undefined) return;

    if (--data.listeners > 0) return;

    originalFn.apply(scrollport, ["scroll", data.scrollListener]);
    observed.delete(scrollport);
  }

  observe(Element.prototype, "addEventListener", onAddListener);
  observe(window, "addEventListener", onAddListener);
  observe(document, "addEventListener", onAddListener);
  observe(Element.prototype, "removeEventListener", onRemoveListener);
  observe(window, "removeEventListener", onRemoveListener);
  observe(document, "removeEventListener", onRemoveListener);
}
