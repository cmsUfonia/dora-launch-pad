import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, FileText, CheckCircle, Clock, Users, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import ExcalidrawDiagram from "@/components/ExcalidrawDiagram";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Index = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedEHR, setSelectedEHR] = useState<'cerner' | 'epic' | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [stepStatuses, setStepStatuses] = useState({
    1: 'completed',
    2: 'pending',
    3: 'pending',
    4: 'pending'
  });
  const [complianceChecks, setComplianceChecks] = useState({
    igApproval: false,
    csoApproval: false,
    qehia: false
  });

  // Add useEffect to update compliance status
  useEffect(() => {
    const checkedCount = Object.values(complianceChecks).filter(Boolean).length;
    let newStatus: 'completed' | 'active' | 'pending' = 'pending';
    
    if (checkedCount === 3) {
      newStatus = 'completed';
    } else if (checkedCount > 0) {
      newStatus = 'active';
    }
    
    setStepStatuses(prev => ({
      ...prev,
      4: newStatus
    }));
  }, [complianceChecks]);

  const [registrationForm, setRegistrationForm] = useState({
    site: '',
    speciality: '',
    pathway: '',
    projectLead: '',
    clinicalLead: '',
    contactEmail: ''
  });

  const specialities = [
    'Ophthalmology',
    'ENT',
    'Gastroenterology',
    'Orthopaedics',
    'Obs & Gynae',
    'MSK',
    'All'
  ];

  const pathways = [
    'SPoA',
    'Pre-op assessment and PROMS',
    'Pre-surgery',
    'Post-op follow up',
    'Post-op PROMS',
    'All'
  ];

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleStatusChange = (stepId: number, status: 'completed' | 'active' | 'pending') => {
    setStepStatuses(prev => ({
      ...prev,
      [stepId]: status
    }));
  };

  const handleComplianceChange = (check: keyof typeof complianceChecks) => {
    setComplianceChecks(prev => ({
      ...prev,
      [check]: !prev[check]
    }));
  };

  const handleRegistrationChange = (field: keyof typeof registrationForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSpecialityChange = (value: string) => {
    setRegistrationForm(prev => ({
      ...prev,
      speciality: value
    }));
  };

  const handlePathwayChange = (value: string) => {
    setRegistrationForm(prev => ({
      ...prev,
      pathway: value
    }));
  };

  const onboardingSteps = [
    {
      id: 1,
      title: "Site Registration",
      description: "Register your healthcare facility and provide basic information",
      status: stepStatuses[1],
      icon: CheckCircle
    },
    {
      id: 2,
      title: "System Integration",
      description: "Connect Dora with your existing healthcare systems",
      status: stepStatuses[2],
      icon: Clock
    },
    {
      id: 3,
      title: "Staff Training",
      description: "Train your medical staff on using Dora effectively",
      status: stepStatuses[3],
      icon: Users
    },
    {
      id: 4,
      title: "Compliance Review",
      description: "Ensure all regulatory requirements are met",
      status: stepStatuses[4],
      icon: Shield
    }
  ];

  const documents = [
    { name: "Compliance Documents", type: "PDF", size: "3.5 MB" },
    { name: "Integration Manual", type: "PDF", size: "1.8 MB" },
    { name: "Training Materials", type: "ZIP", size: "12.3 MB" },
    { name: "API Documentation", type: "PDF", size: "3.1 MB" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-grow text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Dora Clinical Assistant
              </h1>
              <p className="text-sm text-gray-500">
                Healthcare Site Onboarding
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Dr. Johnson</span>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">DJ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Dora Onboarding Dashboard
          </h2>
          <p className="text-lg text-gray-600">
            Let's get your healthcare facility set up with our automated clinical assistant. 
            Follow the steps below to complete your deployment.
          </p>
        </div>

        <ExcalidrawDiagram />

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Onboarding Progress</CardTitle>
            <CardDescription className="text-blue-100">
              You're 25% complete with your Dora deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-blue-400 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all duration-300" style={{ width: '25%' }}></div>
            </div>
            <p className="mt-2 text-blue-100">Step 2 of 4 - System Integration</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Onboarding Steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Onboarding Steps</span>
                </CardTitle>
                <CardDescription>
                  Complete these steps to deploy Dora at your healthcare facility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onboardingSteps.map((step) => {
                    const IconComponent = step.icon;
                    const isActive = activeStep === step.id;
                    return (
                      <div
                        key={step.id}
                        className={`p-4 rounded-lg border transition-all ${
                          step.status === 'completed'
                            ? 'bg-green-50 border-green-200'
                            : step.status === 'active'
                            ? 'bg-amber-50 border-amber-200 ring-2 ring-amber-100'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => handleStepClick(step.id)}
                        >
                          <IconComponent
                            className={`h-6 w-6 mr-4 ${
                              step.status === 'completed'
                                ? 'text-green-500'
                                : step.status === 'active'
                                ? 'text-amber-500'
                                : 'text-red-500'
                            }`}
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            step.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : step.status === 'active'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {step.status === 'completed' ? 'Completed' : 
                             step.status === 'active' ? 'In Progress' : 'Pending'}
                          </div>
                        </div>
                        {expandedStep === step.id && (step.id as number) === 1 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="text-lg font-semibold mb-4">Site Registration Details</h4>
                            <div className="space-y-4">
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="site">Site</Label>
                                <Input
                                  type="text"
                                  id="site"
                                  value={registrationForm.site}
                                  onChange={handleRegistrationChange('site')}
                                  placeholder="Enter site name"
                                  className="w-full"
                                />
                              </div>

                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="speciality">Speciality</Label>
                                <Select 
                                  value={registrationForm.speciality}
                                  onValueChange={handleSpecialityChange}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a speciality" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {specialities.map((speciality) => (
                                      <SelectItem key={speciality} value={speciality}>
                                        {speciality}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="pathway">Pathway</Label>
                                <Select 
                                  value={registrationForm.pathway}
                                  onValueChange={handlePathwayChange}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a pathway" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {pathways.map((pathway) => (
                                      <SelectItem key={pathway} value={pathway}>
                                        {pathway}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="projectLead">Project Lead</Label>
                                <Input
                                  type="text"
                                  id="projectLead"
                                  value={registrationForm.projectLead}
                                  onChange={handleRegistrationChange('projectLead')}
                                  placeholder="Enter project lead name"
                                  className="w-full"
                                />
                              </div>

                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="clinicalLead">Clinical Lead</Label>
                                <Input
                                  type="text"
                                  id="clinicalLead"
                                  value={registrationForm.clinicalLead}
                                  onChange={handleRegistrationChange('clinicalLead')}
                                  placeholder="Enter clinical lead name"
                                  className="w-full"
                                />
                              </div>

                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="contactEmail">Contact (email)</Label>
                                <Input
                                  type="email"
                                  id="contactEmail"
                                  value={registrationForm.contactEmail}
                                  onChange={handleRegistrationChange('contactEmail')}
                                  placeholder="Enter contact email"
                                  className="w-full"
                                />
                              </div>

                              <div className="pt-4">
                                <Button 
                                  className="w-full max-w-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle form submission here
                                    console.log('Form data:', registrationForm);
                                  }}
                                >
                                  Submit Registration
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        {expandedStep === step.id && (step.id as number) === 2 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                              <h4 className="text-lg font-semibold">Dora Call List Upload: SFTP Guide</h4>
                              <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="complete"
                                    checked={stepStatuses[2] === 'completed'}
                                    onCheckedChange={() => handleStatusChange(2, 'completed')}
                                  />
                                  <Label htmlFor="complete">Complete</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="inProgress"
                                    checked={stepStatuses[2] === 'active'}
                                    onCheckedChange={() => handleStatusChange(2, 'active')}
                                  />
                                  <Label htmlFor="inProgress">In Progress</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="pending"
                                    checked={stepStatuses[2] === 'pending'}
                                    onCheckedChange={() => handleStatusChange(2, 'pending')}
                                  />
                                  <Label htmlFor="pending">Pending</Label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="prose max-w-none">
                              <p className="text-gray-600 mb-4">
                                Dora patient call lists can be uploaded to Ufonia via Secure File Transfer Protocol (SFTP). 
                                SFTP allows for a secure transfer of a CSV file to be scheduled; this file should conform to the format detailed below.
                              </p>

                              <div className="mb-6">
                                <h5 className="text-md font-semibold mb-2">Main Steps</h5>
                                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                  <li>Create a CSV file using the structure detailed below</li>
                                  <li>Access the Ufonia testing environment using credentials provided</li>
                                  <li>If applicable, request a firewall change to enable access</li>
                                  <li>Ensure you have the public and private key pairs generated to login</li>
                                  <li>Configure for the production environment once testing is complete</li>
                                </ul>
                              </div>

                              <div className="mb-6">
                                <h5 className="text-md font-semibold mb-2">Getting Started</h5>
                                <p className="text-gray-600">
                                  You will initially be provided with a username and hostname for our testing environment ("sandbox") 
                                  allowing you to test your workflow. Once tested, production credentials can be provided and then 
                                  configured following the same steps as in the sandbox.
                                </p>
                              </div>

                              <div className="mb-6">
                                <h5 className="text-md font-semibold mb-2">CSV File Structure</h5>
                                <p className="text-gray-600 mb-4">
                                  An example CSV file is included with this document. For each patient a row is added to the file, 
                                  all fields should be entered as text. Make sure this is saved as a CSV file e.g not Excel format 
                                  ending in ".xlsx".
                                </p>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Row Header</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Example</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      <tr>
                                        <td className="px-3 py-2 text-sm">mrn</td>
                                        <td className="px-3 py-2 text-sm">Local identifier (Hospital Number, Medical Record Number, Pas ID)</td>
                                        <td className="px-3 py-2 text-sm">123456</td>
                                        <td className="px-3 py-2 text-sm">✅</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm">nhs_number</td>
                                        <td className="px-3 py-2 text-sm">NHS Number, may contain spaces</td>
                                        <td className="px-3 py-2 text-sm">4505577104</td>
                                        <td className="px-3 py-2 text-sm"></td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm">salutation</td>
                                        <td className="px-3 py-2 text-sm"></td>
                                        <td className="px-3 py-2 text-sm">Mr</td>
                                        <td className="px-3 py-2 text-sm">✅</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm">first_name</td>
                                        <td className="px-3 py-2 text-sm">Patient's first name / forename</td>
                                        <td className="px-3 py-2 text-sm">John</td>
                                        <td className="px-3 py-2 text-sm">✅</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm">last_name</td>
                                        <td className="px-3 py-2 text-sm">Patient's last name / surname</td>
                                        <td className="px-3 py-2 text-sm">Doe</td>
                                        <td className="px-3 py-2 text-sm">✅</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm">date_of_birth</td>
                                        <td className="px-3 py-2 text-sm">Patient's date of birth (US or UK format)</td>
                                        <td className="px-3 py-2 text-sm">20/02/2000</td>
                                        <td className="px-3 py-2 text-sm">✅</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm">phone_number_1</td>
                                        <td className="px-3 py-2 text-sm">Patient's first contact number with area code</td>
                                        <td className="px-3 py-2 text-sm"></td>
                                        <td className="px-3 py-2 text-sm">✅</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm">phone_number_2</td>
                                        <td className="px-3 py-2 text-sm">Patient's secondary contact number</td>
                                        <td className="px-3 py-2 text-sm"></td>
                                        <td className="px-3 py-2 text-sm"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              <div className="mb-6">
                                <h5 className="text-md font-semibold mb-2">File Naming Convention</h5>
                                <p className="text-gray-600 mb-2">Format: [timestamp of upload]_[list_type].csv</p>
                                <p className="text-gray-600 mb-2">Example: 20231017T135723Z_CATARACT_POST_OP_CHECK.csv</p>
                                
                                <div className="bg-gray-50 p-4 rounded-lg mt-3">
                                  <h6 className="font-medium mb-2">Valid List Types:</h6>
                                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                    <li>CATARACT_PRE_OP_ASSESSMENT</li>
                                    <li>CATARACT_PRE_SURGERY_REMINDER</li>
                                    <li>CATARACT_POST_OP_CHECK</li>
                                    <li>WAITING_LIST</li>
                                  </ul>
                                </div>
                              </div>

                              <div className="mb-6">
                                <h5 className="text-md font-semibold mb-2">SFTP Setup Process</h5>
                                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                                  <p className="text-yellow-800">
                                    ❗Note: A Firewall change request will have to be made by your networking team to allow traffic 
                                    from the hostname provided on port 22.
                                  </p>
                                </div>
                                
                                <h6 className="font-medium mb-2">Key Steps:</h6>
                                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                                  <li>Generate public/private key pair (consult your BI platform's instructions first)</li>
                                  <li>Send the public key (.pub file) to integration@ufonia.com</li>
                                  <li>Wait for account configuration confirmation from Ufonia</li>
                                  <li>Configure your SFTP client with the provided credentials</li>
                                </ol>

                                <div className="mt-4">
                                  <h6 className="font-medium mb-2">Configure WinSCP with the SSH Key Pair:</h6>
                                  <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                                    <li>Launch WinSCP</li>
                                    <li>In the Login window that appears, select "New Session" to create a new connection profile</li>
                                    <li>In the New Session window, enter the following details:
                                      <ul className="list-disc pl-5 mt-2 mb-2">
                                        <li>File protocol: Select "SFTP" from the dropdown menu</li>
                                        <li>Hostname: upload.staging.ufonia.co</li>
                                        <li>Username: fhft_staging</li>
                                        <li>Port: Set the port number to 22</li>
                                      </ul>
                                    </li>
                                    <li>Under the "Advanced" section, click on the "Authentication" tab</li>
                                    <li>Click on the "..." button next to the "Private key file" field</li>
                                    <li>Locate and select the private key file that you saved</li>
                                    <li>If there is a passphrase associated with the private key, enter it in the "Passphrase" field</li>
                                    <li>Click on the "Save" button and enter a name for the connection profile</li>
                                    <li>Click on "OK" to save the profile</li>
                                  </ol>
                                </div>
                              </div>

                              <div className="mb-6">
                                <h5 className="text-md font-semibold mb-2">Data Validation Process</h5>
                                <div className="space-y-4">
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h6 className="font-medium mb-2">Stage 1: Non-production Testing</h6>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                      <li>Implementation against non-production SFTP server</li>
                                      <li>Verification of data flow and format</li>
                                      <li>Firewall configuration testing</li>
                                      <li>Data flow testing:
                                        <ul className="list-disc pl-5 mt-2">
                                          <li>The data query successfully executed</li>
                                          <li>The data query executed at the scheduled interval stated in the SOP</li>
                                          <li>The file is transferred successfully to the SFTP server</li>
                                          <li>Ensures that firewalls are correctly configured</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h6 className="font-medium mb-2">Stage 2: Production Testing</h6>
                                    <p className="text-gray-600">
                                      The same end to end testing is repeated in a production environment to ensure that the data flow 
                                      can be replicated correctly before going live with real patients.
                                    </p>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h6 className="font-medium mb-2">Stage 3: Go Live</h6>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                      <li>Implementation with real patient data</li>
                                      <li>Ongoing verification of data against agreed format</li>
                                      <li>Automated validation of required fields and phone numbers</li>
                                      <li>Email reporting of any issues found</li>
                                      <li>SOP-guided actions for handling validation failures</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-6">
                                <h5 className="text-md font-semibold mb-2">Error Handling</h5>
                                <div className="bg-red-50 p-4 rounded-lg">
                                  <p className="text-red-800">
                                    If you upload a file that contains incorrect information (e.g., an older version of a file), 
                                    you should upload the correct file as soon as possible. The new file will overwrite the previous 
                                    file you uploaded.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {expandedStep === step.id && (step.id as number) === 3 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                              <h4 className="text-md font-medium text-gray-800">EHR System Training</h4>
                              <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="complete-training"
                                    checked={stepStatuses[3] === 'completed'}
                                    onCheckedChange={() => handleStatusChange(3, 'completed')}
                                  />
                                  <Label htmlFor="complete-training">Complete</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="inProgress-training"
                                    checked={stepStatuses[3] === 'active'}
                                    onCheckedChange={() => handleStatusChange(3, 'active')}
                                  />
                                  <Label htmlFor="inProgress-training">In Progress</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id="pending-training"
                                    checked={stepStatuses[3] === 'pending'}
                                    onCheckedChange={() => handleStatusChange(3, 'pending')}
                                  />
                                  <Label htmlFor="pending-training">Pending</Label>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              Please select your Electronic Health Record (EHR) system to access the relevant training materials.
                            </p>
                            <div className="flex flex-col space-y-4">
                              <div className="flex space-x-4">
                                <Button 
                                  variant={selectedEHR === 'cerner' ? 'default' : 'outline'}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEHR('cerner');
                                  }}
                                >
                                  Cerner
                                </Button>
                                <Button 
                                  variant={selectedEHR === 'epic' ? 'default' : 'outline'}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEHR('epic');
                                  }}
                                >
                                  Epic
                                </Button>
                              </div>
                              
                              {selectedEHR === 'cerner' && (
                                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                                  <h5 className="text-lg font-semibold mb-4">Booking your patient's follow-up after Cataract Surgery</h5>
                                  
                                  <p className="mb-4">
                                    We are using Dora, a new AI system, that will telephone patients ~3 weeks after their cataract surgery to check that they are doing well, answer their questions, and check about 2nd eye surgery.
                                  </p>

                                  <div className="mb-4">
                                    <h6 className="font-semibold mb-2">Is your patient eligible for a Dora call?</h6>
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li>Routine surgery</li>
                                      <li>Anyone able to have a telephone conversation in English</li>
                                      <li>No significant cognitive or hearing impairment</li>
                                      <li>Has access to a personal phone (mobile or landline) including those living in a residential / nursing home</li>
                                    </ul>
                                  </div>

                                  <div className="mb-4">
                                    <h6 className="font-semibold mb-2">Order your patient's Dora call using Cerner</h6>
                                    <ol className="list-decimal pl-5 space-y-1">
                                      <li>Navigate to "Requests/Care Plan"</li>
                                      <li>Search "dora" which will return the result DORA Ophth Post Op Tel F/UP</li>
                                    </ol>
                                  </div>

                                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="font-medium text-blue-900">Important Notes:</p>
                                    <ul className="list-disc pl-5 mt-2 text-blue-800">
                                      <li>Write DORA Follow up on the paper notes</li>
                                      <li>The nurse will give your patient the pre-printed Dora discharge letter</li>
                                    </ul>
                                  </div>
                                </div>
                              )}

                              {selectedEHR === 'epic' && (
                                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                                  <h5 className="text-lg font-semibold mb-4">Booking your patient's follow-up after Cataract Surgery</h5>
                                  
                                  <p className="mb-4">
                                    We are using Dora, a new AI system, that will telephone patients ~3 weeks after their cataract surgery to check that they are doing well, answer their questions, and check about 2nd eye surgery.
                                  </p>

                                  <div className="mb-4">
                                    <h6 className="font-semibold mb-2">Is your patient eligible for a Dora call?</h6>
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li>Routine surgery</li>
                                      <li>Anyone able to have a telephone conversation in English</li>
                                      <li>No significant cognitive or hearing impairment</li>
                                      <li>Has access to a personal phone (mobile or landline) including those living in a residential / nursing home</li>
                                    </ul>
                                  </div>

                                  <div className="mb-4">
                                    <h6 className="font-semibold mb-2">Order your patient's Dora call using Epic</h6>
                                    <ol className="list-decimal pl-5 space-y-1">
                                      <li>Navigate to "Orders" in Epic</li>
                                      <li>Search for "DORA" in the order search box</li>
                                      <li>Select "DORA Ophthalmology Post-Op Follow-up"</li>
                                      <li>Complete the order details and sign the order</li>
                                    </ol>
                                  </div>

                                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="font-medium text-blue-900">Important Notes:</p>
                                    <ul className="list-disc pl-5 mt-2 text-blue-800">
                                      <li>Document "DORA Follow up" in the patient's chart</li>
                                      <li>Ensure the patient receives the Dora information leaflet</li>
                                      <li>The order will automatically schedule the follow-up call</li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {expandedStep === step.id && (step.id as number) === 4 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="space-y-6">
                              <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h5 className="text-md font-semibold mb-4">Required Approvals</h5>
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-3">
                                    <Checkbox 
                                      id="ig-approval" 
                                      checked={complianceChecks.igApproval}
                                      onCheckedChange={() => handleComplianceChange('igApproval')}
                                    />
                                    <div>
                                      <Label htmlFor="ig-approval" className="font-medium">IG - DPIA and DPA approval</Label>
                                      <p className="text-sm text-gray-500">Information Governance, Data Protection Impact Assessment and Data Processing Agreement</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3">
                                    <Checkbox 
                                      id="cso-approval" 
                                      checked={complianceChecks.csoApproval}
                                      onCheckedChange={() => handleComplianceChange('csoApproval')}
                                    />
                                    <div>
                                      <Label htmlFor="cso-approval" className="font-medium">Clinical Safety Officer (CSO) approval</Label>
                                      <p className="text-sm text-gray-500">Clinical safety review and sign-off</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3">
                                    <Checkbox 
                                      id="qehia" 
                                      checked={complianceChecks.qehia}
                                      onCheckedChange={() => handleComplianceChange('qehia')}
                                    />
                                    <div>
                                      <Label htmlFor="qehia" className="font-medium">QEHIA</Label>
                                      <p className="text-sm text-gray-500">Quality and Equality Health Impact Assessment</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Generate SOP Section */}
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <FileText className="h-5 w-5" />
                  <span>Standard Operating Procedures</span>
                </CardTitle>
                <CardDescription className="text-green-700">
                  Generate customized SOPs for your healthcare facility's Dora deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  Our AI will create tailored Standard Operating Procedures based on your facility's 
                  specific requirements, patient demographics, and clinical workflows.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate SOP
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Schedule Training Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Integration Guide
                </Button>
              </CardContent>
            </Card>

            {/* Other Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Other Documents</CardTitle>
                <CardDescription>
                  Essential resources for your Dora deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4 text-blue-600">
                  View All Documents →
                </Button>
              </CardContent>
            </Card>

            {/* Support Contact */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 text-sm mb-4">
                  Our support team is here to help you with your Dora deployment.
                </p>
                <div className="space-y-4">
                  <a 
                    href="mailto:info@ufonia.com"
                    className="block text-sm text-blue-700 hover:text-blue-800 font-semibold"
                  >
                    info@ufonia.com
                  </a>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                    onClick={() => window.open('https://ufonia.com/get-in-touch/', '_blank')}
                  >
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
