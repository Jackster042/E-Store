import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRef } from "react";
import { Input } from "../ui/input";
import { Divide, UploadCloudIcon, FileIcon } from "lucide-react";

// PROPS TYPES
interface ProductImageUploadProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  url: string | null;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  file,
  setFile,
  url,
  setUrl,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">
        Upload Product Image
      </Label>
      <div
        className="border border-b rounded-md"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload your image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span>{file.name}</span>
            </div>
            <Button variant="ghost" onClick={handleRemoveFile}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductImageUpload;
