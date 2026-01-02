const Categories = () => {
  const genres = ["Fiction", "Science", "History", "Business", "Kids"];
  return (
    <div style={{ padding: '50px 5%', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '30px' }}>Shop by Genre</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {genres.map(g => (
          <div key={g} style={{ 
            padding: '20px 40px', 
            background: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
            cursor: 'pointer' 
          }}>
            {g}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; // <--- MAKE SURE THIS LINE IS HERE