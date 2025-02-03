import { useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import SubmissionForm from "@/components/SubmissionForm";

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              <h2 className="text-xl font-semibold text-academic-primary">
                Administrator Login
              </h2>
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
            <AdminDashboard />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-academic-primary">
                Submit Research Record
              </h2>
            </div>
            <SubmissionForm />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;