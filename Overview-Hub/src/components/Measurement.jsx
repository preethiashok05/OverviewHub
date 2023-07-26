import React from 'react';

const XLSXDataUI = () => {
  // Data as specified
  const data = [
    { name: 'Ref_object', length: 4, min_tolerence: -0.2, max_tolerence: 0.2 },
    { name: 'length_1', length: 6, min_tolerence: -0.2, max_tolerence: 0.2 },
    { name: 'length_2', length: 3, min_tolerence: -0.2, max_tolerence: 0.2 },
    { name: 'square_1', length: 2.5, min_tolerence: -0.2, max_tolerence: 0.2 },
    { name: 'Diameter', length: 3.6, min_tolerence: -0.2, max_tolerence: 0.2 },
    { name: 'square_2', length: 2.5, min_tolerence: -0.2, max_tolerence: 0.2 },
    // Add more data rows as needed
  ];

  return (
    <div>
      {data.map((row, index) => {
        // Calculate the positions of min and max tolerance circles on the scale
        const scaleLength = 100; // Adjust this value to control the length of the scale line
        const minTolerancePosition = (row.min_tolerence / (row.max_tolerence - row.min_tolerence)) * scaleLength;
        const maxTolerancePosition = scaleLength - minTolerancePosition;

        return (
          <div key={index} style={{ width: '100%', marginBottom: '20px', border: '1px solid #ccc' }}>
            <div style={{ fontSize: '12pt', padding: '10px' }}>{row.name}</div>
            <div style={{ fontSize: '10pt', padding: '5px', textAlign: 'center' }}>Length: {row.length}</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Scale line */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10%',
                  right: '10%',
                  height: '2px', // Adjust the height of the scale line
                  backgroundColor: 'lightgray', // Adjust the color of the scale line
                  transform: 'translateY(-50%)',
                }}
              />

              {/* Min Tolerance circle */}
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  position: 'absolute',
                  top: '50%',
                  left: '20%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Max Tolerance circle */}
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  position: 'absolute',
                  top: '50%',
                  right:'20%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Green scale between min and max tolerance */}
              <div
                style={{
                  height: '8px', // Adjust the height of the green scale
                  backgroundColor: 'green',
                  position: 'absolute',
                  top: '50%',
                  left:  '40%',
                  right: '40%',
                  transform: 'translateY(-50%)',
                }}
              />
            </div>

            <div style={{ fontSize: '10pt', padding: '5px', textAlign: 'center' }}>
              Min Tolerance: {row.min_tolerence} | Max Tolerance: {row.max_tolerence}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default XLSXDataUI;
