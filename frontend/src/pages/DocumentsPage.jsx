import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../components/common/Card';
import DocumentUploadCard from '../components/documents/DocumentUploadCard';
import { documentsApi } from '../api/services';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);

  const loadDocuments = async () => {
    const { data } = await documentsApi.list();
    setDocuments(data.documents || []);
  };

  useEffect(() => {
    loadDocuments().catch(() => toast.error('Failed to load documents'));
  }, []);

  const handleUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await documentsApi.upload(formData);
      toast.success('Document uploaded');
      loadDocuments();
    } catch {
      toast.error('Document upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DocumentUploadCard onUpload={handleUpload} uploading={uploading} />
      <Card title="Document Library">
        <ul className="space-y-2 text-sm">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
              <span>{doc.file_name}</span>
              <a className="text-brand-600" href={doc.file_url} target="_blank" rel="noreferrer">View</a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
