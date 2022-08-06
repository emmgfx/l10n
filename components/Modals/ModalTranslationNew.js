import { useModal } from "../../contexts/modal";

import Card from "../Card";
import Modal from "../Modal";
import TranslationNew from "../TranslationNew";

const ModalTranslationNew = ({ project, fetchTranslations }) => {
  const { clearCurrentModal } = useModal();
  const onAdded = () => {
    fetchTranslations();
    clearCurrentModal();
  };
  return (
    <Modal>
      <Card onClose={clearCurrentModal}>
        <Card.Header>New Translation</Card.Header>
        <Card.Body>
          <TranslationNew project={project} onAdded={onAdded} />
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default ModalTranslationNew;
