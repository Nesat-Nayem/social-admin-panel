import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom'; // Import useParams
import { useGetMasterById } from 'services/Master.Services';
import MedicineStockForm from './form/MedicineStockForm';
import SampleStockForm from './form/SampleStockForm';

export default function ManagerVsoStockPage() {
  // Use useParams to access the dynamic parameters
  const { id } = useParams();

  const { data, isLoading } = useGetMasterById('vso');

  const currentUser = data;

  return (
    <>
      <Helmet>
        <title>VSO MANAGE | Voiz</title>
      </Helmet>

      {/* <h1>Hello, welcome to dynamic VSO stock page</h1>

      <p>VSO ID: {id}</p> */}

      <MedicineStockForm currentUser={currentUser} isEdit />
      <SampleStockForm currentUser={currentUser} isEdit />
    </>
  );
}
