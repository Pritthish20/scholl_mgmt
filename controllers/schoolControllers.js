import prisma from '../config/prismaClient.js';

// Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// POST /addSchool
export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Latitude and Longitude must be numbers.' });
  }

  try {
    const school = await prisma.school.create({
      data: { name, address, latitude, longitude },
    });
    res.status(201).json({ message: 'School added successfully!', schoolId: school.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};

// GET /listSchools
export const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'User latitude and longitude are required.' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Latitude and Longitude must be valid numbers.' });
  }

  try {
    const schools = await prisma.school.findMany();

    const schoolsWithDistance = schools.map((school) => {
      const distance = getDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance: distance.toFixed(2) };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
};
