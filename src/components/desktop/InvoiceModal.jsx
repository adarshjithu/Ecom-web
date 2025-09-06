import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

const InvoiceModal = ({ show, onClose, order }) => {
  const invoiceRef = useRef(null);

  if (!show) return null;

  const handleDownload = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
      const imgData = await toPng(element, { cacheBust: true });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${order.orderNumber}.pdf`);
    } catch (err) {
      console.error("Error generating PDF", err);
    }
  };

  return createPortal(
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white w-[600px] rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Invoice Preview */}
        <div
          ref={invoiceRef}
          className="text-sm bg-white p-4 rounded-md"
          id="invoice"
          style={{ backgroundColor: "#ffffff", color: "#000000" }} // avoid oklch issue
        >
          <h2 className="text-xl font-bold mb-2">
            Invoice #{order.orderNumber}
          </h2>
          <p>
            <strong>Issued On:</strong>{" "}
            {new Date(order.createdAt).toDateString()}
          </p>

          <div className="flex justify-between mt-4">
            <div>
              <h3 className="font-semibold">Bill From:</h3>
              <p>Medico Store</p>
              <p>Dubai, UAE</p>
            </div>
            <div>
              <h3 className="font-semibold">Bill To:</h3>
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>
                {order.shippingAddress.building},{" "}
                {order.shippingAddress.street}, {order.shippingAddress.city}
              </p>
            </div>
          </div>

          <table className="w-full mt-4 border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 border">{item.productId.name}</td>
                  <td className="p-2 border">AED {item.price.toFixed(2)}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">
                    AED {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <div>
              <p>
                <strong>Subtotal:</strong> AED {order?.subTotal?.toFixed(2)}
              </p>
              <p>
                <strong>Shipping Fee:</strong> AED {order.shippingFee.toFixed(2)}
              </p>
              <p>
                <strong>Total:</strong> AED {order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Download
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InvoiceModal;
