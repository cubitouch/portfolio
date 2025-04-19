import { useCallback } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

interface Props {
  barcode?: string;
  onChange: (value: string) => void;
}
const ProductScanner = ({ barcode, onChange }: Props) => {
  const onCapture = useCallback(
    (codes: any[]) => {
      console.log(codes);
      //   alert(codes[0].rawValue);
      onChange(codes[0].rawValue);
    },
    [onChange]
  );
  return (
    <>
      {!barcode && (
        <BarcodeScanner
          options={{ formats: ["ean_13"], delay: 500 }}
          onCapture={onCapture}
          paused={!!barcode}
        />
      )}
    </>
  );
};

export default ProductScanner;
