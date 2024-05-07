import React, { useEffect, useState } from 'react';
import { Card, Breadcrumb, Form, Radio, Select, DatePicker, Button, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Tag, Space } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import useChannel from '@/hooks/useChannel';
import { delArticleAPI, getArticlesAPI } from '@/apis/article';
import img404 from '@/assests/error.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { Option } = Select

export default function Article() {

  const navigate = useNavigate();

  // 通过封装的钩子函数函数频道类型
  const { channelList } = useChannel();

  // 定义文章总条数
  const [count, setCount] = useState(0);

  //获取所有文章信息  
  const [articles, setArticles] = useState([]);

  // 1. 准备参数
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 5
  })

  const onPageChange = (values) => {
    // 修改请求参数中的当前页码
    setReqData({ ...reqData, page: values })
  }

  useEffect(() => {
    const getArticles = async () => {
      const res = await getArticlesAPI(reqData);
      // 保存文章列表
      setArticles(res.data.results);
      // 保存文章条数
      setCount(res.data.total_count);
    }
    getArticles();
  }, [reqData]);

  // 定义状态枚举
  const status = {
    1: <Tag color='warning'>待审核</Tag>,
    2: <Tag color='success'>审核通过</Tag>
  }

  // 定义列数据, dataIndex对应接口返回字段名称
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/layout/publish?id=${data.id}`)} />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 删除选定文章
  const onConfirm = async (data) => {
    const { id } = data;
    await delArticleAPI(id);
    // 重新渲染
    setReqData({ ...reqData });
  }

  const onFinish = (values) => {
    setReqData({
      ...reqData,
      channel_id: values.channel_id,
      status: values.status,
      begin_pubdate: values.date ? values.date[0].format('YYYY-MM-DD') : "",
      end_pubdate: values.date ? values.date[1].format('YYYY-MM-DD') : ""
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articles} pagination={{
          total: count,
          pageSize: reqData.per_page,
          onChange: onPageChange
        }} />
      </Card>
    </div>
  )
}
