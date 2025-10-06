import { Link } from 'react-router-dom';
export default function Forbidden(){
  return (
    <div style={{padding:16}}>
      <h1 style={{fontSize:20, fontWeight:600}}>No tenés permisos para ver esta página</h1>
      <p>Consultá con el admin si creés que es un error.</p>
      <p><Link to="/" className="underline">Volver al inicio</Link></p>
    </div>
  );
}
