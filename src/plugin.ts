penpot.ui.open("Typescales", `?theme=${penpot.theme}`, {
  width: 760,
  height: 540,
});

penpot.ui.onMessage<{ type: string; data: any }>((message) => {
  if (message.type === "generate") {
    const board = penpot.createBoard();
    board.name = "Typescales";
    board.addFlexLayout();
    board.flex.dir = "column";
    board.flex.rowGap = 16;
    board.horizontalSizing = "auto";
    board.verticalSizing = "auto";

    message.data.forEach((type: { fontSize: string }) => {
      const text = penpot.createText(
        "The quick brown fox jumps over the lazy dog."
      );
      text.fontSize = type.fontSize;
      board.appendChild(text);
    });
  }
});

penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});

penpot.ui.sendMessage({ type: "fonts", data: penpot.fonts });
