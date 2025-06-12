
import { WasteReportForm } from '@/components/waste/WasteReportForm';

export default function ReportWaste() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report Waste 📸
          </h1>
          <p className="text-gray-600">
            Found some waste on campus? Report it here and earn points!
          </p>
        </div>
        
        <WasteReportForm />
      </div>
    </div>
  );
}
