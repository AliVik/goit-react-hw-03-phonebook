import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Wrapper,
  PhonebookHeading,
  ContactsHeading,
} from "./components/Form/StyledForm";
import Form from "./components/Form";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleFormDatas = (data) => {
    const { contacts } = this.state;
    const normalizedDataName = data.name.toLowerCase();
    const existingContact = contacts.map((contact) => {
      return contact.name.toLowerCase().includes(normalizedDataName);
    });

    existingContact.includes(true)
      ? toast.error(`${data.name} is already in contacts`)
      : this.setState((prevState) => {
          return {
            contacts: [...prevState.contacts, data],
          };
        });
  };

  handleFilterDatas = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filterContactList = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  onDeleteBtnClick = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => {
          return contact.id !== contactId;
        }),
      };
    });
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    this.setState({ contacts });
  }
  componentDidUpdate(_, prevState) {
    const previousContacts = prevState.contacts;
    const currentContacts = this.state.contacts;

    if (previousContacts !== currentContacts) {
      localStorage.setItem("contacts", JSON.stringify(currentContacts));
    }
  }
  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContactList();

    return (
      <Wrapper>
        <PhonebookHeading>Phonebook</PhonebookHeading>
        <Form onSubmit={this.handleFormDatas} />
        <ContactsHeading>Contacts</ContactsHeading>
        <Filter value={filter} onChange={this.handleFilterDatas} />
        <ContactList
          contacts={filteredContacts}
          onDeleteClick={this.onDeleteBtnClick}
        />
        <Toaster />
      </Wrapper>
    );
  }
}

export default App;
