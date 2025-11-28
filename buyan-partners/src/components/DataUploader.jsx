import { db } from '../firebase';
import { siteConfig } from '../data/siteConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

const DataUploader = () => {
  const [status, setStatus] = useState("Idle");

  const uploadData = async () => {
    setStatus("Uploading...");
    try {
      const sections = Object.keys(siteConfig);
      
      for (const section of sections) {
        let dataToUpload = siteConfig[section];

        // --- KRİTİK DÜZELTME ---
        // Eğer veri bir DİZİ (Array) ise, onu bir OBJE içine sarıyoruz.
        // Çünkü Firestore root seviyesinde array kabul etmez.
        if (Array.isArray(dataToUpload)) {
          dataToUpload = { items: dataToUpload };
        }

        await setDoc(doc(db, "site-content", section), dataToUpload);
      }

      setStatus("✅ Success! Data uploaded.");
      alert("All data uploaded to Firebase successfully!");
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Error: " + error.message);
      // Hata detayını görmek için alert de ekleyelim
      alert("Upload failed! Check the red text box for details.");
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-white p-6 rounded-xl shadow-2xl border border-gray-200 max-w-sm text-gray-900">
      <h3 className="font-bold text-lg mb-2">Database Setup</h3>
      <p className="text-sm text-gray-500 mb-4">
        This tool uploads static data from <b>siteConfig.js</b> to your Firebase database.
      </p>
      
      <div className="flex flex-col gap-2">
        <button 
          onClick={uploadData}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          disabled={status === "Uploading..."}
        >
          {status === "Uploading..." ? "Uploading..." : "Upload Data 🚀"}
        </button>
        <span className="text-xs font-mono bg-gray-100 p-2 rounded text-center border border-gray-100 break-words">
          Status: {status}
        </span>
      </div>
    </div>
  );
};

export default DataUploader;