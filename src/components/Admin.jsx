'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, MapPin, Languages, Calendar, CreditCard } from 'lucide-react'

const mockGuides= [
    {
      id: 1,
      name: "John Doe",
      adharNo: "1234 5678 9012",
      pincode: "400001",
      address: "123 Main St, Mumbai, Maharashtra",
      languages: ["English", "Hindi", "Marathi"],
      experienceYears: 5,
      certificationFiles: ["tourism_cert.pdf", "first_aid_cert.pdf"]
    },
    {
      id: 2,
      name: "Jane Smith",
      adharNo: "9876 5432 1098",
      pincode: "110001",
      address: "456 Park Ave, New Delhi, Delhi",
      languages: ["English", "Hindi", "Punjabi"],
      experienceYears: 3,
      certificationFiles: ["guide_license.pdf"]
    },
    {
      id: 3,
      name: "Raj Patel",
      adharNo: "4567 8901 2345",
      pincode: "380001",
      address: "789 River Rd, Ahmedabad, Gujarat",
      languages: ["English", "Gujarati", "Hindi"],
      experienceYears: 7,
      certificationFiles: ["heritage_guide_cert.pdf", "language_proficiency.pdf"]
    }
  ]

export default function AdminDashboard() {
  const [selectedGuide, setSelectedGuide] = useState(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Travel Guide Verification Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Adhar No</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockGuides.map((guide) => (
            <TableRow key={guide.id}>
              <TableCell>{guide.name}</TableCell>
              <TableCell>{guide.adharNo}</TableCell>
              <TableCell>{guide.experienceYears} years</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedGuide(guide)}>
                      Verify Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Guide Details: {selectedGuide?.name}</DialogTitle>
                    </DialogHeader>
                    {selectedGuide && (
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <CreditCard className="mr-2" /> Adhar Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p><strong>Adhar No:</strong> {selectedGuide.adharNo}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <MapPin className="mr-2" /> Location Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p><strong>Pincode:</strong> {selectedGuide.pincode}</p>
                            <p><strong>Address:</strong> {selectedGuide.address}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Languages className="mr-2" /> Languages
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {selectedGuide.languages.map((lang, index) => (
                                <Badge key={index} variant="secondary">{lang}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Calendar className="mr-2" /> Experience
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{selectedGuide.experienceYears} years</p>
                          </CardContent>
                        </Card>
                        <Card className="col-span-2">
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <FileText className="mr-2" /> Certification Files
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5">
                              {selectedGuide.certificationFiles.map((file, index) => (
                                <li key={index} className="mb-2">
                                  <a href="#" className="text-blue-500 hover:underline flex items-center">
                                    <Eye className="mr-2" size={16} />
                                    {file}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <Button variant="default">Approve</Button>
                      <Button variant="destructive" className="ml-2">Reject</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}