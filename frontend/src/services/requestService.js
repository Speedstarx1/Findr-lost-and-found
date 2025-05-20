// This is a mock service that simulates API calls
// In a real application, these would make actual HTTP requests to your backend

// Sample data
const requests = [
  {
    id: "67ff6e545945bf6f0ec03962",
    report: {
      id: "67ff237213885173347a03c4",
      items: [
        { name: "White pen", status: null },
        { name: "Handkerchief", status: null },
      ],
      user: {
        id: "67fd40d0930fc81042cb9037",
        name: "Tim Omolana",
        matriculationNo: 210806078,
        telephoneNo: "09149548345",
        email: "tim1@email.com",
      },
      type: "FOUND",
      description:
        "I found an handkerchief and pen -- some links containing images of the items https://imgur.com/a/FZ8C8Xj",
      location: "LT009, Faculty of Science",
      lastSeen: "2025-04-16T10:30:00",
      status: "OPEN",
      createdAt: "2025-04-16T04:26:42.743",
      updatedAt: "2025-04-16T04:26:42.743",
    },
    requester: {
      id: "67ff6dff5945bf6f0ec03961",
      name: "Tim the Second",
      matriculationNo: 210806077,
      telephoneNo: "09149548347",
      email: "tim2@email.com",
    },
    type: "CLAIM",
    status: "PENDING",
    note: "This is my proof of ownership, I own the items in this report please",
    createdAt: "2025-04-16T15:54:41.642582",
    updatedAt: "2025-04-16T15:54:41.642587",
    resolvedAt: null,
  },
  {
    id: "67ff77f2627d1f003ddfb235",
    report: {
      id: "67ff234113885173347a03c3",
      items: [
        { name: "White pen", status: null },
        { name: "Handkerchief", status: null },
      ],
      user: {
        id: "67fd40d0930fc81042cb9037",
        name: "Tim Omolana",
        matriculationNo: 210806078,
        telephoneNo: "09149548345",
        email: "tim1@email.com",
      },
      type: "LOST",
      description:
        "I lost my handkerchief and pen -- some links containing images of lost items https://imgur.com/a/FZ8C8Xj",
      location: "LT009, Faculty of Science",
      lastSeen: "2025-04-14T15:30:00",
      status: "OPEN",
      createdAt: "2025-04-16T04:25:53.86",
      updatedAt: "2025-04-16T04:25:53.86",
    },
    requester: {
      id: "67ff6dff5945bf6f0ec03961",
      name: "Tim the Second",
      matriculationNo: 210806077,
      telephoneNo: "09149548347",
      email: "tim2@email.com",
    },
    type: "RETURN",
    status: "APPROVED",
    note: "I found these items and would love to return them please. Proof: https://img.url/found_items",
    createdAt: "2025-04-16T10:27:14.889",
    updatedAt: "2025-04-16T10:27:14.889",
    resolvedAt: "2025-04-16T15:18:24.882",
  },
]

// Get my requests
export const getMyRequests = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...requests]
}

// Get request by ID
export const getRequestById = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const request = requests.find((r) => r.id === id)

  if (!request) {
    throw new Error("Request not found")
  }

  return { ...request }
}

// Create a new request
export const createRequest = async (requestData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Get the report for this request
  const report = {
    id: requestData.reportId,
    items: [
      { name: "White pen", status: null },
      { name: "Handkerchief", status: null },
    ],
    user: {
      id: "67fd40d0930fc81042cb9037",
      name: "Tim Omolana",
      matriculationNo: 210806078,
      telephoneNo: "09149548345",
      email: "tim1@email.com",
    },
    type: requestData.type === "CLAIM" ? "FOUND" : "LOST",
    description: "Sample description for the report",
    location: "LT009, Faculty of Science",
    lastSeen: "2025-04-16T10:30:00",
    status: "OPEN",
    createdAt: "2025-04-16T04:26:42.743",
    updatedAt: "2025-04-16T04:26:42.743",
  }

  // Generate a random ID
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // Create a new request object
  const newRequest = {
    id,
    report,
    requester: {
      id: "67ff6dff5945bf6f0ec03961",
      name: "Tim the Second",
      matriculationNo: 210806077,
      telephoneNo: "09149548347",
      email: "tim2@email.com",
    },
    type: requestData.type,
    status: "PENDING",
    note: requestData.note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    resolvedAt: null,
  }

  // Add to our mock database
  requests.push(newRequest)

  return { ...newRequest }
}

// Approve a request
export const approveRequest = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const requestIndex = requests.findIndex((r) => r.id === id)

  if (requestIndex === -1) {
    throw new Error("Request not found")
  }

  // Update the request status
  requests[requestIndex] = {
    ...requests[requestIndex],
    status: "APPROVED",
    updatedAt: new Date().toISOString(),
    resolvedAt: new Date().toISOString(),
  }

  return { ...requests[requestIndex] }
}

// Reject a request
export const rejectRequest = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const requestIndex = requests.findIndex((r) => r.id === id)

  if (requestIndex === -1) {
    throw new Error("Request not found")
  }

  // Update the request status
  requests[requestIndex] = {
    ...requests[requestIndex],
    status: "REJECTED",
    updatedAt: new Date().toISOString(),
    resolvedAt: new Date().toISOString(),
  }

  return { ...requests[requestIndex] }
}
