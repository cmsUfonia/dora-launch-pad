import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, FileText, CheckCircle, Clock, Users, Shield } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [activeStep, setActiveStep] = useState(1);

  const onboardingSteps = [
    {
      id: 1,
      title: "Site Registration",
      description: "Register your healthcare facility and provide basic information",
      status: "completed",
      icon: CheckCircle
    },
    {
      id: 2,
      title: "System Integration",
      description: "Connect Dora with your existing healthcare systems",
      status: "active",
      icon: Clock
    },
    {
      id: 3,
      title: "Staff Training",
      description: "Train your medical staff on using Dora effectively",
      status: "pending",
      icon: Users
    },
    {
      id: 4,
      title: "Compliance Review",
      description: "Ensure all regulatory requirements are met",
      status: "pending",
      icon: Shield
    }
  ];

  const documents = [
    { name: "HIPAA Compliance Guide", type: "PDF", size: "2.4 MB" },
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
            <div className="flex items-center space-x-3">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dora Clinical Assistant</h1>
                <p className="text-sm text-gray-500">Healthcare Site Onboarding</p>
              </div>
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
                    return (
                      <div
                        key={step.id}
                        className={`flex items-center p-4 rounded-lg border transition-all cursor-pointer ${
                          step.status === 'completed'
                            ? 'bg-green-50 border-green-200'
                            : step.status === 'active'
                            ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => setActiveStep(step.id)}
                      >
                        <IconComponent
                          className={`h-6 w-6 mr-4 ${
                            step.status === 'completed'
                              ? 'text-green-500'
                              : step.status === 'active'
                              ? 'text-blue-500'
                              : 'text-gray-400'
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
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.status === 'completed' ? 'Completed' : 
                           step.status === 'active' ? 'In Progress' : 'Pending'}
                        </div>
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
                  <Shield className="h-4 w-4 mr-2" />
                  Review Compliance Checklist
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
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
