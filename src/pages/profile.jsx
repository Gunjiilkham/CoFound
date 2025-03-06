"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { Separator } from "../components/ui/separator"
import NavBar from "../app/components/NavBar"

export default function ProfilePage() {
  // State for form fields
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("")
  const [major, setMajor] = useState("")
  const [college, setCollege] = useState("")
  const [gradYear, setGradYear] = useState("")
  const [field, setField] = useState("")
  const [goals, setGoals] = useState("")
  const [experience, setExperience] = useState("")
  const [skills, setSkills] = useState("")
  
  // State for file upload
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState("")

  // Load saved profile data on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setName(profileData.name || '');
      setAge(profileData.age || '');
      setLocation(profileData.location || '');
      setMajor(profileData.major || '');
      setCollege(profileData.college || '');
      setGradYear(profileData.gradYear || '');
      setField(profileData.field || '');
      setGoals(profileData.goals || '');
      setExperience(profileData.experience || '');
      setSkills(profileData.skills || '');
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first")
      return
    }

    setIsUploading(true)
    setUploadStatus("Uploading...")

    try {
      const formData = new FormData()
      formData.append('pdf', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        setUploadStatus("File uploaded successfully!")
      } else {
        setUploadStatus(`Error: ${result.error || "Failed to upload file"}`)
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save profile data to localStorage
    const profileData = {
      name,
      age,
      location,
      major,
      college,
      gradYear,
      field,
      goals,
      experience,
      skills
    }
    
    localStorage.setItem('userProfile', JSON.stringify(profileData))
    
    // Navigate to job listings page
    window.location.href = "/listings"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full bg-black z-50">
        <NavBar />
      </nav>
      
      <div className="container mx-auto py-10 px-4 pt-20">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Profile Page</CardTitle>
            <CardDescription>Update your personal and professional information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <Separator className="my-3" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name:</Label>
                      <Input 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age:</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter your age" 
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="location">Location:</Label>
                      <Input 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State" 
                      />
                    </div>
                  </div>
                </div>

                {/* Education Information Section */}
                <div>
                  <h3 className="text-lg font-medium">Education Information</h3>
                  <Separator className="my-3" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="major">Major:</Label>
                      <Input 
                        id="major" 
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        placeholder="Enter your major" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="college">College/University:</Label>
                      <Input 
                        id="college" 
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="Enter your college" 
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="gradYear">Graduation Year:</Label>
                      <Input 
                        id="gradYear" 
                        type="number" 
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        placeholder="Enter your graduation year" 
                      />
                    </div>
                  </div>
                </div>

                {/* Career Section */}
                <div>
                  <h3 className="text-lg font-medium">Career</h3>
                  <Separator className="my-3" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="field">Field:</Label>
                      <Select value={field} onValueChange={setField}>
                        <SelectTrigger id="field">
                          <SelectValue placeholder="-- Select an option --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it-telecom">Technology & IT</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="accounting-finance">Accounting & Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="creative-design">Creative & Design</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="consultancy">Business & Consultancy</SelectItem>
                          <SelectItem value="social-work">Social Work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="goals">Career Goals:</Label>
                      <Textarea
                        id="goals"
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        placeholder="Where do you see yourself in 10 years?"
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="experience">Experience:</Label>
                      <Textarea 
                        id="experience" 
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Noteable places of employment?" 
                        className="min-h-[80px]" 
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="skills">Skills:</Label>
                      <Textarea 
                        id="skills" 
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="What are your strongest skillsets?" 
                        className="min-h-[80px]" 
                      />
                    </div>
                  </div>
                </div>

                {/* Resume Upload Section */}
                <div>
                  <h3 className="text-lg font-medium">Resume Upload</h3>
                  <Separator className="my-3" />
                  <div className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="resume">Upload your resume</Label>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("resume")?.click()}
                          className="w-full"
                        >
                          {fileName ? "Change File" : "Select File"}
                        </Button>
                        {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
                      </div>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <p className="text-sm text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
                      
                      {file && (
                        <Button 
                          type="button" 
                          onClick={handleFileUpload}
                          disabled={isUploading}
                          variant="secondary"
                          className="mt-2"
                        >
                          {isUploading ? "Uploading..." : "Upload Resume"}
                        </Button>
                      )}
                      
                      {uploadStatus && (
                        <p className={`text-sm mt-2 ${uploadStatus.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                          {uploadStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button type="submit" className="w-full sm:w-auto">
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

