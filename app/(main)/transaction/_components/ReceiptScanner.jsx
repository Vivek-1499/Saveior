"use client";

import { scanReceipt } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hook/usefetch";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const ReceiptScanner = ({ onScanComplete }) => {
  const fileInputRef = useRef();

  const {
    loading: receiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async(file)=>{
    if(file.size > 5*1024*1024){
      toast.error("File size should be less than 5MB")
    }
    await scanReceiptFn(file)
  }

  useEffect(()=>{
    if(scannedData && !receiptLoading){
      onScanComplete(scannedData)
      toast.success("Receipt scanned successfully")
    }
  }, [scannedData, receiptLoading])
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      <Button 
      type="button"
      variant="outline"
      className="w-full h-10 bg-gradient-to-br from-purple-300 via-indigo-400 to-purple-600 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
      onClick={()=>fileInputRef.current?.click()}
      disabled={receiptLoading}>
        {receiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt</span>
          </>
        ) : (
          <>
            <Camera className="h-5 w-5 mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;
