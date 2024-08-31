import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function generateInvoicePDF(order) {
  // 创建一个新的PDF文档
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 尺寸

  // 嵌入字体
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // 设置一些常量
  const margin = 50;
  const fontSize = 10;

  page.drawRectangle({
    x: 0,
    y: page.getHeight() - 5,
    width: page.getWidth(),
    height: 5,
    color: rgb(1, 0, 0),
  });
  page.drawRectangle({
    x: 0,
    y: page.getHeight() - 125,
    width: page.getWidth(),
    height: 120,
    color: rgb(0.95, 0.95, 0.95),
  });
  // 添加公司logo和信息
  const logoUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png";
  const logoImage = await pdfDoc.embedPng(
    await fetch(logoUrl).then((res) => res.arrayBuffer())
  );
  page.drawImage(logoImage, {
    x: margin,
    y: page.getHeight() - 90,
    width: 50,
    height: 50,
  });

  page.drawText("LuluLemon Athletica", {
    x: margin + 80,
    y: page.getHeight() - 50,
    font: boldFont,
    size: 16,
  });
  page.drawText("1818 Cornwall Ave, Vancouver BC Canada V6J 1C7", {
    x: margin + 80,
    y: page.getHeight() - 65,
    font,
    size: fontSize,
  });
  page.drawText("+604 732 6124", {
    x: margin + 80,
    y: page.getHeight() - 80,
    font,
    size: fontSize,
  });
  page.drawText("gec@lululemon.com", {
    x: margin + 80,
    y: page.getHeight() - 95,
    font,
    size: fontSize,
  });

  // 添加发票标题和编号
  page.drawText("INVOICE", {
    x: 450,
    y: page.getHeight() - 50,
    font: boldFont,
    size: 24,
  });
  page.drawText(`DATE: `, {
    x: 450,
    y: page.getHeight() - 70,
    font,
    size: fontSize,
  });
  page.drawLine({
    start: { x: 450, y: page.getHeight() - 74 },
    end: { x: 450 + 90, y: page.getHeight() - 74 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${new Date(order.createdAt).toLocaleDateString()}`, {
    x: 450 + 40,
    y: page.getHeight() - 70,
    font,
    size: fontSize,
    underline: true,
  });
  page.drawText(`INVOICE NO: `, {
    x: 450,
    y: page.getHeight() - 95,
    font,
    size: fontSize,
  });
  page.drawLine({
    start: { x: 450, y: page.getHeight() - 99 },
    end: { x: 450 + 90, y: page.getHeight() - 99 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${order.id}`, {
    x: 450 + 80,
    y: page.getHeight() - 95,
    font,
    size: fontSize,
    underline: true,
  });

  // 添加账单和收货地址
  page.drawText("BILL TO", {
    x: margin,
    y: page.getHeight() - 180,
    font: boldFont,
    size: fontSize,
  });
  page.drawLine({
    start: { x: margin, y: page.getHeight() - 184 },
    end: { x: margin + 150, y: page.getHeight() - 184 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText("SHIP TO", {
    x: 300,
    y: page.getHeight() - 180,
    font: boldFont,
    size: fontSize,
  });
  page.drawLine({
    start: { x: 300, y: page.getHeight() - 184 },
    end: { x: 300 + 150, y: page.getHeight() - 184 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  const addressLines = [
    order.shippingAddress.firstName + " " + order.shippingAddress.lastName,
    order.shippingAddress.address,
    `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`,
    order.shippingAddress.phoneNumber,
  ];

  addressLines.forEach((line, index) => {
    page.drawText(line, {
      x: margin,
      y: page.getHeight() - 200 - index * 15,
      font,
      size: fontSize,
    });
    page.drawText(line, {
      x: 300,
      y: page.getHeight() - 200 - index * 15,
      font,
      size: fontSize,
    });
  });

  // 添加订单项目表格
  const tableTop = page.getHeight() - 280;
  const tableHeaders = [
    "DESCRIPTION",
    "PRODUCTID",
    "QTY",
    "UNIT PRICE",
    "TOTAL",
  ];
  const columnWidths = [200, 90, 50, 80, 80];

  // 绘制表格头部
  page.drawRectangle({
    x: margin,
    y: tableTop - 20,
    width: page.getWidth() - 2 * margin,
    height: 20,
    color: rgb(1, 0, 0),
  });

  tableHeaders.forEach((header, index) => {
    let x = margin;
    for (let i = 0; i < index; i++) {
      x += columnWidths[i];
    }
    page.drawText(header, {
      x: x + 5,
      y: tableTop - 15,
      font: boldFont,
      size: fontSize,
    });
  });

  // 添加订单项目
  order.orderItems.forEach((item, index) => {
    const y = tableTop - 40 - index * 20;

    // 绘制行背景(隔行变色)
    if (index % 2 === 0) {
      page.drawRectangle({
        x: margin,
        y: y - 5,
        width: page.getWidth() - 2 * margin,
        height: 20,
        color: rgb(0.95, 0.95, 0.95),
      });
    }

    page.drawText(item.name, { x: margin + 5, y, font, size: fontSize });
    page.drawText(item.productId, {
      x: margin + columnWidths[0] + 5,
      y,
      font,
      size: fontSize,
    });
    page.drawText(item.quantity.toString(), {
        x: margin + columnWidths[0] + columnWidths[1] + 5,
        y,
        font,
        size: fontSize,
      });
    page.drawText(`$${item.price.toFixed(2)}`, {
      x: margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + 5,
      y,
      font,
      size: fontSize,
    });
    page.drawText(`$${(item.price * item.quantity).toFixed(2)}`, {
      x: margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + 5,
      y,
      font,
      size: fontSize,
    });
  });

  // 添加总计
  const distanceTableAndSubtotal = order.orderItems.length > 10 ? 20 : 250;
  const totalY = tableTop - 20 - order.orderItems.length * 20 - distanceTableAndSubtotal;
  page.drawText("SUBTOTAL", {
    x: 400,
    y: totalY,
    font: boldFont,
    size: fontSize,
  });
  page.drawText(`$${order.totalBeforeTax.toFixed(2)}`, {
    x: 500,
    y: totalY,
    font,
    size: fontSize,
  });
  page.drawLine({
    start: { x: 400, y: totalY-4 },
    end: { x: 550, y: totalY-4 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText("SHIPPINGFEE", {
    x: 400,
    y: totalY - 20,
    font: boldFont,
    size: fontSize,
  });
  page.drawText(`$${order.shippingFee.toFixed(2)}`, {
    x: 500,
    y: totalY - 20,
    font,
    size: fontSize,
  });
  page.drawLine({
    start: { x: 400, y: totalY-24 },
    end: { x: 550, y: totalY-24 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText("TAX", {
    x: 400,
    y: totalY - 40,
    font: boldFont,
    size: fontSize,
  });
  page.drawText(`$${order.taxAmount.toFixed(2)}`, {
    x: 500,
    y: totalY - 40,
    font,
    size: fontSize,
  });
  page.drawLine({
    start: { x: 400, y: totalY-44 },
    end: { x: 550, y: totalY-44 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawRectangle({
    x: 400,
    y: totalY - 64,
    width: 150,
    height: 18,
    color: rgb(1, 0, 0),
  });
  page.drawText("TOTAL", {
    x: 400,
    y: totalY - 60,
    font: boldFont,
    size: fontSize,
  });
  page.drawText(`$${order.totalAfterTax.toFixed(2)}`, {
    x: 500,
    y: totalY - 60,
    font,
    size: fontSize,
  });
  page.drawLine({
    start: { x: 400, y: totalY-64 },
    end: { x: 550, y: totalY-64 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // 添加支付信息
  page.drawText("Payment Instructions:", {
    x: margin,
    y: totalY,
    font: boldFont,
    size: fontSize,
  });
  page.drawLine({
    start: { x: margin, y: totalY-4 },
    end: { x: margin + 105, y: totalY-4 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Payment Status: ${order.payment.paymentStatus}`, {
    x: margin,
    y: totalY - 15,
    font,
    size: fontSize,
  });
  page.drawText(`Payment Method: ${order.payment.paymentMethod}`, {
    x: margin,
    y: totalY - 30,
    font,
    size: fontSize,
  });
  // 添加其他支付相关信息...

  // 添加感谢信息
  page.drawText("Thank you for your business with us.", {
    x: margin,
    y: 50,
    font,
    size: fontSize,
  });
  page.drawRectangle({
    x: 0,
    y: 5,
    width: page.getWidth(),
    height: 5,
    color: rgb(1, 0, 0),
  });

  // 生成PDF文件
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export { generateInvoicePDF };
