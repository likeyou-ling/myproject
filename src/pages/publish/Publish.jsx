import React, { useEffect, useState } from 'react';
import { Card, Breadcrumb, Form, Input, Select, Radio, Upload, Space, Button, message, Modal } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { getArticleById, updateArticleAPI } from '@/apis/article';
import { publishaAPI } from '@/apis/article';
import { PlusOutlined } from '@ant-design/icons';
import "./index.scss";
import 'react-quill/dist/quill.snow.css'
import useChannel from '@/hooks/useChannel';

export default function Publish() {

  // channel type
  const { channelList } = useChannel();
  // image type
  const [imageType, setImageType] = useState(0)
  // image file list
  const [imageList, setImageList] = useState([]);

  // get form true dom
  const [form] = Form.useForm();

  // control tip dialog after submit
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 获取Article组件跳转传递过来的id属性
  const [searchParam] = useSearchParams();
  const articleId = searchParam.get('id');

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const { Option } = Select;

  const onTypeChange = (event) => {
    const { value } = event.target;
    setImageType(value);
  }

  const onChange = (event) => {
    let flag = false;
    // limit upload image type. only support 'jpeg', 'jpg', 'png', 'gif'
    const fileList = event.fileList;
    if (fileList && fileList.length > 0) {
      flag = fileList.every((item) => {
        return item.type === "image/jpeg" || item.type === "image/jpg" || item.type === "image/png" || item.type === "image/gif";
      })
    }
    if (flag) {
      setImageList(event.fileList);
    } else {
      return message.warning("上传图片类型仅支持jpg、jpeg、png");
    }

  }

  // send request params success
  const onFinish = async (values) => {
    const { title, channel_id, content } = values
    if (imageType !== imageList.length) {
      return message.warning("上传图片数量与选择图片数量不一致，请重试！");
    }
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        // [url]
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        })
      },
      channel_id
    }

    if (articleId) {
      // 更新文章
      updateArticleAPI({...reqData, id: articleId});
    }else {
      // 发布文章
      await publishaAPI(reqData)
    }
    setIsModalOpen(true);
  }

  useEffect(() => {
    const _getArticleById = async () => {
      // 通过id获取正在编辑的文章
      const res = await getArticleById(articleId);
      // 需要传入一个对象，对象的key就是对应的name
      const data = res.data;
      const { cover } = data;
      // 回填数据
      form.setFieldsValue({ ...data, type: cover.type });
      // 回填图片列表
      setImageType(cover.type)
      // 回显图片({url:url})
      setImageList(cover.images.map(url => {
        return { url }
      }))
    }

    if (articleId) {
      _getArticleById()
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout/home'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */}
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* rich text editor */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Modal title="您的信息已提交成功" open={isModalOpen} className="modelStyle"
        footer={[
          <Button
            onClick={handleOk}
            type="primary"
            key="submit"
          >
            确定
          </Button>
        ]}>
      </Modal>
    </div>
  )
}
