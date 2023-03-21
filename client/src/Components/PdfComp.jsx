

// import { useEffect, useRef, useState } from "react";
// import jsPDF from "jspdf";
// import { MyBtn } from "./MyComponents";
// import { Document, Image, Page } from "@react-pdf/renderer";
// import QRCode, { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas";
// import { async } from "@firebase/util";

// function PDFGen({ ComponentToPrint, cd }) {
//   const reportTemplateRef = useRef(null);
//   const [imgdata, setImgdata] = useState();
//   const handleGeneratePdf = async () => {
//     const ele = document.getElementById("prt");
//     const canvas = await html2canvas(ele);
//     const doc = new jsPDF({
//       orientation: "landscape",
//       format: "a4",
//       unit: "px",
//     });
//     console.log(canvas)
//     // // Adding the fonts.
//     // doc.setFont("Inter-Regular", "normal", 500);
//     // // doc.setFont("black");
//     doc.addImage(canvas, "png", 0, 0, 40, 40);
//     doc.html(reportTemplateRef.current, {
//       async callback(doc) {
//         doc.save("receipt");
//       },
//     });
//   };

//   // const canvasRef = useRef();

//   useEffect(() => {
//     // let base64Image = document.getElementById("prt")?.toDataURL();
//     // console.log(base64Image); // this will output the data URL to the console
//     // setImgdata(base64Image);
//     // if (true) {
//     //   let pdf = new jsPDF({
//     //     orientation: "landscape",
//     //     unit: "px",
//     //     format: "a4",
//     //   });
//     //   pdf.setFont("Inter-Regular", "normal");

//     //   pdf.addImage(base64Image, "png", 0, 0, 40, 40);

//     //   // Downloads the pdf
//     //   pdf.html(reportTemplateRef.current, {
//     //     async callback(pdf) {
//     //       // pdf.save("receipt");
//     //     },
//     //   });
//     // }
//   }, []);

//   return (
//     <div>
//       <MyBtn onclickHandle={handleGeneratePdf} label={"Print"} />
//       <Document ref={reportTemplateRef} style={{ width: "100%" }}>
//         <div style={{ margin: "auto", width: "90%" }} id={"prt"}>
//           {ComponentToPrint}
//           {cd}
//         </div>
//       </Document>
//     </div>
//   );
// }

// export default PDFGen;
