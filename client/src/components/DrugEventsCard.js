import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle } from 'lucide-react';

// Sample data for demonstration
const sampleDrugs = [
  {
    id: "001",
    country: "USA",
    reportType: "Initial",
    serious: true,
    reactions: ["Headache", "Nausea"],
    drugs: ["Aspirin", "Paracetamol"]
  },
  {
    id: "002",
    country: "UK",
    reportType: "Follow-up",
    serious: false,
    reactions: ["Dizziness"],
    drugs: ["Ibuprofen"]
  }
];

const DrugEventsCard = ({ drugs = sampleDrugs }) => {
  // If no drugs data is provided, show a message
  if (!drugs || drugs.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Drug Adverse Events</h1>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <p className="text-center text-gray-500">No drug events to display</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Drug Adverse Events</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {drugs.map((drug) => (
          <Card key={drug.id} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">ID: {drug.id}</CardTitle>
              {drug.serious && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Serious
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">{drug.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Report Type</p>
                  <p className="font-medium">{drug.reportType}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Reactions</p>
                <div className="flex flex-wrap gap-1">
                  {(drug.reactions || []).map((reaction, idx) => (
                    <Badge key={idx} variant="secondary">
                      {reaction}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Drug Characterizations</p>
                <div className="flex flex-wrap gap-1">
                  {(drug.drugs || []).map((drugName, idx) => (
                    <Badge key={idx} variant="outline">
                      {drugName}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DrugEventsCard;