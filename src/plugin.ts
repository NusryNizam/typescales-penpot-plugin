penpot.ui.open("Typescales", `?theme=${penpot.theme}`, {
  width: 640,
  height: 500,
});

penpot.ui.onMessage<{ type: string; data: any }>((message) => {
  if (message.type === "create-text") {
    penpot.createText("Hello!");
  }
});

penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
