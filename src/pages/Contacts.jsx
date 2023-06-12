import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Contact from "../components/contacts/Contact";
import { useGetContactsQuery } from "../features/contacts/contactsAPI";
import ContactsLoader from "../ui/ContactsLoader";
import { formateContact } from "../utils/formateContact";

const generateArr = (num) => {
  const nums = [];
  for (let i = 1; i <= num; i++) {
    nums.push(i);
  }
  return nums;
};

const Contacts = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetContactsQuery();

  // const { loaded, contacts, pageNumber, setPageNumber, pageCount } =
  //   useContext(ContactContext);

  // const paginationArr = generateArr(pageCount);
  // const isPageOutOfBound = pageNumber > pageCount;

  // useEffect(() => {
  //   if (isPageOutOfBound) {
  //     setPageNumber(pageNumber - 1);
  //   }
  // }, [isPageOutOfBound]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <ContactsLoader />
        <ContactsLoader />
        <ContactsLoader />
        <ContactsLoader />
      </>
    );
  }

  if (isSuccess && data?.data?.length === 0) {
    content = (
      <Col sm>
        <Card body className="text-center">
          Contacts not found!
        </Card>
      </Col>
    );
  }

  if (isSuccess && data?.data?.length) {
    content = data.data.map((contact) => (
      <Contact key={contact.id} contact={formateContact(contact)} />
    ));
  }

  if (isError) {
    toast.error(error?.data?.message);
  }

  return (
    <>
      <h2 className="text-center mb-5">All Contacts</h2>
      <Row className="g-3">{content}</Row>
      <div className="mt-5">
        {/* <Pagination className="justify-content-center">
          {paginationArr.map((count) => {
            return (
              <Pagination.Item
                key={count}
                active={count === pageNumber}
                onClick={() => setPageNumber(count)}
              >
                {count}{" "}
              </Pagination.Item>
            );
          })}
        </Pagination> */}
      </div>
    </>
  );
};

export default Contacts;
