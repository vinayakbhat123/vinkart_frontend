import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

import React from "react";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if(files?.length){
      setProductData((prev) => ({
        ...prev,
        productImg:[...prev.productImg, ...files]
      }))
    }
  }
  
  const removeImage = (index) => {
  setProductData((prev) => {
    const images = Array.isArray(prev.productImg) ? prev.productImg : [];
    const updatedImages = images.filter((_, i) => i !== index);

    return {...prev, productImg: updatedImages};
  });
};


  return (
    <div className="grid gap-2">
      <Label>Product Images</Label>
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="images/*"
        multiple onChange={handleFiles}
      />
      <Button variant={"outline"}>
        <label htmlFor="file-upload" className="cursor-pointer">
          upload Images
        </label>
      </Button>

      {/* image review */}
      {productData.productImg.length > 0 && (
        <div className="grid grid-cols gap-4 mt-3 sm:grid-cols-3">
          {productData.productImg.map((file, index) => {
            //cheack file is already a file (from the index) or DB string
            let preview;
            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === "string") {
              preview = file;
            } else if (file.url) {
              preview = file.url;
            } else {
              return null;
            }

            return <Card key={index} className={"relative group overflow-hidden"}>
              <CardContent>
                <img src={preview} alt="" width={200} height={200} className="w-full h-36 object-cover rouded-md" />
                {/* remove button*/} 
                <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"><X size={14}/></button>
              </CardContent>
            </Card>;
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
