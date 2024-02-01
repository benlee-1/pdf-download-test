import PdfPrinter from "pdfmake";

const fonts = {
  Roboto: {
    normal: "./fonts/Roboto/Roboto-Regular.ttf",
    bold: "fonts/Roboto/Roboto-Medium.ttf",
    italics: "fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto/Roboto-MediumItalic.ttf"
  }
};

const printer = new PdfPrinter(fonts);

export function generatePDF() {
  const docDefinition = {
    header: function (currentPage, pageCount, pageSize) {
      // you can use pageSize.width and pageSize.height to get the size of the page
      return {
        columns: [
          // Add content for the header, for example, a company logo
          {
            text: "Confidential",
            alignment: "right",
            margin: [0, 10, 20, 0], // top, right, bottom, left
            fontSize: 10
          }
        ],
        margin: [40, 10] // left, top
      };
    },
    footer: function (currentPage, pageCount) {
      return {
        columns: [
          "This is a footer content",
          {
            // This is the right part of the footer
            text: [
              { text: "Page " + currentPage.toString(), italics: true },
              " of ",
              { text: pageCount.toString(), italics: true }
            ],
            alignment: "right"
          }
        ],
        margin: [40, 0] // left, bottom
      };
    },
    content: [
      {
        columns: [
          {
            // Logo
            image: "gooseheadlogo",
            width: 60
          },
          [
            { text: "Insurance Proposal", style: "header" },
            { text: "Prepared for: Bruce & Lincy Smith", style: "subheader" },
            { text: "123 Main Street\nDallas, TX 78701", style: "subheader" }
          ]
        ],
        columnGap: 10
      },
      // Agent Details
      {
        text: [
          { text: "Goosehead Agent: ", bold: true },
          "Ryan Brooks\n",
          { text: "Phone: ", bold: true },
          "[000-000-0000]\n",
          { text: "Email: ", bold: true },
          "email@gogoosehead.com"
        ],
        margin: [0, 10, 0, 10]
      },
      // Auto Quote Section - Stacked Tables with Zebra Striping
      {
        style: "tableExample",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              { text: "Insurance Company:", bold: true, fillColor: "#eaf2f5" },
              { text: "Progressive County Mutual Ins Co", fillColor: "#ffffff" }
            ],
            [
              { text: "Term Length:", bold: true, fillColor: "#ffffff" },
              { text: "6 Months", fillColor: "#eaf2f5" }
            ]
            // ... additional key-value pairs for other details, alternating fill colors as needed
          ]
        },
        layout: "noBorders"
      },
      {
        table: {
          body: [
            [
              {
                style: "tableExample",
                color: "#555",
                table: {
                  body: [
                    [
                      {
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a pharetra odio.\n\nVestibulum erat mauris, sodales et consequat sit amet, ultricies vitae erat. Etiam feugiat orci justo, ultrices malesuada dui ornare ac."
                      },
                      {
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a pharetra odio.\n\nVestibulum erat mauris, sodales et consequat sit amet, ultricies vitae erat. Etiam feugiat orci justo, ultrices malesuada dui ornare ac."
                      }
                    ]
                  ]
                },

                layout: "noBorders"
              }
            ],
            [
              {
                style: "tableExample",
                table: {
                  body: [
                    ["Column 1", "Column 2", "Column 3"],
                    [
                      {
                        stack: [
                          "Let's try an unordered list",
                          {
                            ul: ["item 1", "item 2"]
                          }
                        ]
                      },
                      [
                        "or a nested table",
                        {
                          table: {
                            body: [
                              ["Col1", "Col2", "Col3"],
                              ["1", "2", "3"],
                              ["1", "2", "3"]
                            ]
                          }
                        }
                      ],
                      {
                        text: [
                          "Inlines can be ",
                          { text: "styled\n", italics: true },
                          {
                            text: "easily as everywhere else",
                            fontSize: 10
                          }
                        ]
                      }
                    ]
                  ]
                },
                layout: "noBorders"
              }
            ]
          ]
        }
      }

      // ... Additional content
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        color: "#4F6228" // A shade of green
      },
      subheader: {
        fontSize: 12,
        margin: [0, 2, 0, 2]
      }
      // tableExample: {
      //   margin: [0, 5, 0, 15],
      //   border: 1
      // }
      // ... Additional styles
    },
    images: {
      gooseheadlogo: "./images/gooseheadlogo.jpg" // Base64 encoded image string
    }
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return pdfDoc;
}
