import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

interface SubmissionFormProps {
  onSubmit: (formData: any) => void;
}

const SubmissionForm = ({ onSubmit }: SubmissionFormProps) => {
  const [userType, setUserType] = useState<"LPU" | "NON_LPU">("LPU");
  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    programDepartment: "",
    schoolName: "",
    thesisTitle: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ userType, ...formData });
    console.log("Form submitted:", { userType, ...formData });
    toast({
      title: "Success!",
      description: "Your research record has been submitted.",
    });
    // Reset form
    setFormData({
      name: "",
      studentNumber: "",
      programDepartment: "",
      schoolName: "",
      thesisTitle: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        <Label>User Type</Label>
        <RadioGroup
          defaultValue="LPU"
          onValueChange={(value) => setUserType(value as "LPU" | "NON_LPU")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="LPU" id="lpu" />
            <Label htmlFor="lpu">LPU Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NON_LPU" id="non-lpu" />
            <Label htmlFor="non-lpu">Non-LPU Student</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {userType === "LPU" ? (
          <>
            <div>
              <Label htmlFor="studentNumber">Student Number</Label>
              <Input
                id="studentNumber"
                value={formData.studentNumber}
                onChange={(e) =>
                  setFormData({ ...formData, studentNumber: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="programDepartment">Program/Department</Label>
              <Input
                id="programDepartment"
                value={formData.programDepartment}
                onChange={(e) =>
                  setFormData({ ...formData, programDepartment: e.target.value })
                }
                required
              />
            </div>
          </>
        ) : (
          <div>
            <Label htmlFor="schoolName">Name of School</Label>
            <Input
              id="schoolName"
              value={formData.schoolName}
              onChange={(e) =>
                setFormData({ ...formData, schoolName: e.target.value })
              }
              required
            />
          </div>
        )}

        <div>
          <Label htmlFor="thesisTitle">Title of Thesis</Label>
          <Input
            id="thesisTitle"
            value={formData.thesisTitle}
            onChange={(e) =>
              setFormData({ ...formData, thesisTitle: e.target.value })
            }
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-academic-primary hover:bg-academic-primary/90">
        Submit Research Record
      </Button>
    </form>
  );
};

export default SubmissionForm;