

const CreateNews = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>Create a news</h1>
      <div style={{display: 'flex', flexDirection: 'column', margin: '50px', width: '900px'}}> 
        <input type="text" placeholder="Title" />
        <input type="text" style={{ height: '300px' }} placeholder="News text" />
        <label>Add a image: </label><input type="file" /> 
      </div>
    </div>
  )
}
export default CreateNews;
