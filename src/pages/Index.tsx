import { useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import SubmissionForm from "@/components/SubmissionForm";

interface Record {
  id: number;
  date: string;
  userType: "LPU" | "NON_LPU";
  name: string;
  studentNumber?: string;
  programDepartment?: string;
  schoolName?: string;
  thesisTitle: string;
}

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [records, setRecords] = useState<Record[]>([]);

  const handleSubmission = (formData: any) => {
    const newRecord: Record = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      userType: formData.userType,
      name: formData.name,
      studentNumber: formData.studentNumber || undefined,
      programDepartment: formData.programDepartment || undefined,
      schoolName: formData.schoolName || undefined,
      thesisTitle: formData.thesisTitle,
    };
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  return (
    <div className="min-h-screen bg-academic-light">
      <header className="bg-academic-primary text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Graduate School Research Collection</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {!isAdmin && !isAuthenticated && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsAdmin(true)}
              className="text-academic-primary hover:underline"
            >
              Admin Login
            </button>
          </div>
        )}

        {isAdmin && !isAuthenticated ? (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-academic-primary">
                  Administrator Login
                </h2>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="text-academic-primary hover:underline flex items-center gap-2"
                >
                  ← Back
                </button>
              </div>
            </div>
            <AdminLogin onLogin={() => setIsAuthenticated(true)} />
          </div>
        ) : isAuthenticated ? (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-academic-primary">
                Research Records Dashboard
              </h2>
              <button
                onClick={() => {
                  setIsAdmin(false);
                  setIsAuthenticated(false);
                }}
                className="text-academic-primary hover:underline"
              >
                Logout
              </button>
            </div>
            <AdminDashboard records={records} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-academic-primary">
                Submit Research Record
              </h2>
            </div>
            <SubmissionForm onSubmit={handleSubmission} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;