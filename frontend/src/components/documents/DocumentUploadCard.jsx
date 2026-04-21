import { useState } from 'react';
import Button from '../common/Button';

export default function DocumentUploadCard({ onUpload, uploading }) {
  const [file, setFile] = useState(null);

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-6 dark:border-slate-700">
      <h3 className="text-lg font-semibold">Upload Legal Document</h3>
      <input className="mt-4 w-full" type="file" onChange={(e) => setFile(e.target.files?.[0])} />
      <Button
        className="mt-4"
        disabled={!file || uploading}
        onClick={() => {
          if (file) onUpload(file);
          setFile(null);
        }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
}
