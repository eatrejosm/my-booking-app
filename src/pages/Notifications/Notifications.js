import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { Tabs } from 'antd';

const Notifications = () => {
  const getData = async () => {
    try {
      const response = await axios.post(
        '/api/v1/users/userdata-by-id',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const items = [
    {
      key: '1',
      tab: 'Seen',
      content: <div style={{ display: 'flex', justifyContent: 'flex-end' }}>Seen 2</div>,
    },
    {
      key: '2',
      tab: 'Pending notifications',
      content: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>Pending 1</div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className='page-title'>Notifications</h1>

      <Tabs defaultActiveKey='1' onChange={(key) => console.log(key)}>
        {items.map((item) => (
          <Tabs.TabPane tab={item.tab} key={item.key}>
            {item.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Layout>
  );
};

export default Notifications;